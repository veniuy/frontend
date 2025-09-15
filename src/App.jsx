import os
import sys
from typing import List

# DON'T CHANGE THIS !!!
# Inserta la carpeta raíz del repo para resolver imports "src.*"
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, jsonify, request, make_response, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from werkzeug.exceptions import HTTPException

from src.config import Config
from src.models import db

# --- Modelos (si algún import falla, ver logs de arranque) ---
from src.models.user import User            # noqa
from src.models.event import Event          # noqa
from src.models.guest import Guest          # noqa
from src.models.gift_list import GiftList   # noqa
from src.models.customization import Customization  # noqa
from src.models.photo import Photo          # noqa
from src.models.plan import Plan            # noqa
from src.models.payment_log import PaymentLog  # noqa
from src.models.payment import Payment      # noqa
from src.models.template import Template    # noqa
from src.models.user_design import UserDesign  # noqa
from src.models.invitation_section import InvitationSection  # noqa
from src.models.rsvp import RSVP            # noqa

# --- Blueprints (rutas API) ---
from src.routes.user import user_bp
from src.routes.auth import auth_bp
from src.routes.events import events_bp
from src.routes.invitations import invitations_bp
from src.routes.uploads import uploads_bp
from src.routes.gift_lists import gift_lists_bp
from src.routes.photos import photos_bp
from src.routes.oauth import oauth_bp, init_oauth
from src.routes.checkout import checkout_bp
from src.routes.webhooks import webhooks_bp
from src.routes.payments import payments_bp
from src.routes.templates import templates_bp
from src.routes.plans import plans_bp
from src.routes.admin_enhanced import admin_enhanced_bp as admin_bp
from src.routes.editor import editor_bp
from src.routes.editor_v2 import editor_v2_bp
from src.routes.export import export_bp
from src.routes.events_payment_flow import payment_flow_bp

from src.utils.email_sender import init_mail
from src.utils.reminders import init_scheduler

# -----------------------------------------------------------------------------
# App
# -----------------------------------------------------------------------------
# App sin estáticos: el frontend se sirve aparte
app = Flask(__name__, static_folder=None)
app.config.from_object(Config)

# Aceptar rutas con y sin "/" final
app.url_map.strict_slashes = False

# ---- Cookies de sesión cross-site (navegadores 2025) ----
#   - SameSite=None + Secure para permitir envío en contextos cross-site (SPA + API)
#   - HttpOnly por seguridad
#   - NO fijar SESSION_COOKIE_DOMAIN (dejar que Flask resuelva)
app.config.update(
    SECRET_KEY=os.getenv("SECRET_KEY", "change-me"),
    SESSION_COOKIE_NAME=os.getenv("SESSION_COOKIE_NAME", "cl_session"),
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SECURE=True,      # requerido con SameSite=None
    SESSION_COOKIE_SAMESITE="None",  # habilita third-party cookies
    # No establecer SESSION_COOKIE_DOMAIN a menos que administres subdominios propios.
)

# Opcional: no propagar excepciones en prod
app.config.setdefault("PROPAGATE_EXCEPTIONS", False)

# ---- CORS (con credenciales) ----
DEFAULT_ORIGINS: List[str] = [
    "https://frontend-u7in.onrender.com",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
ENV_ORIGINS = os.getenv("FRONTEND_ORIGINS", "")
if ENV_ORIGINS:
    parsed = [o.strip().rstrip("/") for o in ENV_ORIGINS.split(",") if o.strip()]
    if parsed:
        DEFAULT_ORIGINS = parsed

CORS(
    app,
    supports_credentials=True,
    resources={
        r"/api/*": {
            "origins": DEFAULT_ORIGINS,
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
        }
    },
)

# -----------------------------------------------------------------------------
# Preflight global (corta cualquier 400 en OPTIONS)
# -----------------------------------------------------------------------------
@app.before_request
def _short_circuit_preflight():
    if request.method == "OPTIONS" and request.path.startswith("/api/"):
        resp = make_response("", 204)  # sin cuerpo
        origin = (request.headers.get("Origin") or "").rstrip("/")
        allowed = {o.rstrip("/") for o in DEFAULT_ORIGINS}
        if origin in allowed:
            resp.headers["Access-Control-Allow-Origin"] = origin
            resp.headers["Vary"] = "Origin"
            resp.headers["Access-Control-Allow-Credentials"] = "true"
            resp.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
            resp.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        return resp

# ---- Extensiones ----
db.init_app(app)
migrate = Migrate(app, db)  # noqa: F841
init_mail(app)
init_scheduler(app)
init_oauth(app)

# Asegura carpeta de uploads si aplica
os.makedirs(app.config.get("UPLOAD_FOLDER", "uploads"), exist_ok=True)

# -----------------------------------------------------------------------------
# Rutas base
# -----------------------------------------------------------------------------
@app.route("/", methods=["GET"])
def root():
    return jsonify({
        "ok": True,
        "service": "backend",
        "env": os.getenv("FLASK_ENV", "production"),
        "release": os.getenv("RELEASE", "dev"),
    }), 200


@app.route("/api/health", methods=["GET", "HEAD"])
def health():
    return jsonify({"status": "ok"}), 200


@app.route("/api/health/routes", methods=["GET"])
def health_routes():
    """Lista todas las rutas para depuración."""
    try:
        rules = sorted([f"{r.methods} {r.rule}" for r in app.url_map.iter_rules()])
        return jsonify({"routes": rules}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/favicon.ico")
def favicon():
    return ("", 204)

# -----------------------------------------------------------------------------
# Registro de Blueprints (todas bajo /api)
#   Importante:
#   - editor_bp y export_bp NO deben tener prefijos "api" en sus @route internos.
#     Deben ser /designs..., /events/<id>/design..., /designs/<id>/export/pdf...
# -----------------------------------------------------------------------------
app.register_blueprint(user_bp,          url_prefix="/api")
app.register_blueprint(auth_bp,          url_prefix="/api/auth")
app.register_blueprint(events_bp,        url_prefix="/api/events")
app.register_blueprint(invitations_bp,   url_prefix="/api/invitations")
app.register_blueprint(uploads_bp,       url_prefix="/api/uploads")
app.register_blueprint(gift_lists_bp,    url_prefix="/api")
app.register_blueprint(photos_bp,        url_prefix="/api")
app.register_blueprint(oauth_bp,         url_prefix="/api/oauth")
app.register_blueprint(checkout_bp,      url_prefix="/api")
app.register_blueprint(webhooks_bp,      url_prefix="/api/webhooks")
app.register_blueprint(payments_bp,      url_prefix="/api/payments")
app.register_blueprint(templates_bp,     url_prefix="/api/templates")
app.register_blueprint(plans_bp,         url_prefix="/api/plans")
app.register_blueprint(admin_bp,         url_prefix="/api/admin")
app.register_blueprint(editor_bp,        url_prefix="/api")
app.register_blueprint(editor_v2_bp,     url_prefix="/api/editor")
app.register_blueprint(export_bp,        url_prefix="/api")
app.register_blueprint(payment_flow_bp,  url_prefix="/api")

# -----------------------------------------------------------------------------
# Alias de conveniencia para /api/events y /api/events/
# Redirige (307) a /api/events/my-events para evitar 404 de índice
# -----------------------------------------------------------------------------
@app.route("/api/events", methods=["GET"])
@app.route("/api/events/", methods=["GET"])
def events_index_alias():
    return redirect("/api/events/my-events", code=307)

# -----------------------------------------------------------------------------
# Post-procesado de respuesta: reforzar atributos de cookie de sesión (CHIPS)
# -----------------------------------------------------------------------------
@app.after_request
def add_partitioned_cookie(resp):
    """
    Añade 'Partitioned' a la cookie de sesión y normaliza SameSite/Secure.
    Evita el bloqueo de cookies third-party en Chrome/Brave 2025.
    """
    cookie_name = (app.config.get("SESSION_COOKIE_NAME") or "session") + "="
    cookies = resp.headers.getlist("Set-Cookie")
    if cookies:
        resp.headers.remove("Set-Cookie")
        for c in cookies:
            if cookie_name in c:
                if "SameSite=None" not in c:
                    c += "; SameSite=None"
                if "Secure" not in c:
                    c += "; Secure"
                if "Partitioned" not in c:
                    c += "; Partitioned"
            resp.headers.add("Set-Cookie", c)
    return resp

# -----------------------------------------------------------------------------
# Manejo de errores JSON
# -----------------------------------------------------------------------------
@app.errorhandler(HTTPException)
def handle_http_exception(e: HTTPException):
    payload = {
        "error": getattr(e, "name", "HTTP error"),
        "message": getattr(e, "description", "HTTP error"),
        "status": e.code,
        "path": request.path,
        "method": request.method,
    }
    return jsonify(payload), e.code


@app.errorhandler(Exception)
def handle_exception(_e: Exception):
    payload = {
        "error": "Internal Server Error",
        "status": 500,
        "path": request.path,
        "method": request.method,
    }
    return jsonify(payload), 500

# -----------------------------------------------------------------------------
# Main
# -----------------------------------------------------------------------------
if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.getenv("PORT", "5000")),
        debug=(os.getenv("FLASK_DEBUG", "0") == "1"),
    )
