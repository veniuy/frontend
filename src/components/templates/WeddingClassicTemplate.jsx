import React, { useState, useEffect } from 'react';
import './WeddingClassicTemplate.css';

const WeddingClassicTemplate = () => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const targetDate = new Date('2026-10-27T18:00:00'); // Ejemplo: 27 de Octubre de 2026

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const openRsvpModal = () => setShowRsvpModal(true);
  const closeRsvpModal = () => setShowRsvpModal(false);
  const openGiftModal = () => setShowGiftModal(true);
  const closeGiftModal = () => setShowGiftModal(false);
  const openInfoModal = () => setShowInfoModal(true);
  const closeInfoModal = () => setShowInfoModal(false);

  return (
    <div className="wedding-classic-template">
      {/* Sección Hero */}
      <section id="hero" className="hero-section">
        <p className="hero-subtitle">¡Con mucho amor!</p>
        <h1>[Nombre Novia] & [Nombre Novio]</h1>
        <p className="hero-date">27 de Octubre de 2026</p>
        <button className="hero-button" onClick={openRsvpModal}>Confirma tu Asistencia</button>
      </section>

      {/* Sección Countdown */}
      <section id="countdown" className="countdown-section">
        <h2>Nuestra Cuenta Regresiva</h2>
        <div className="countdown-timer">
          <div className="time-unit"><span>{countdown.days}</span>Días</div>
          <div className="time-unit"><span>{countdown.hours}</span>Horas</div>
          <div className="time-unit"><span>{countdown.minutes}</span>Minutos</div>
          <div className="time-unit"><span>{countdown.seconds}</span>Segundos</div>
        </div>
      </section>

      {/* Sección Ceremonia */}
      <section id="ceremonia" className="ceremonia-section">
        <h2>Ceremonia Nupcial</h2>
        <p>Te invitamos a ser parte de este momento tan especial donde uniremos nuestras vidas.</p>
        <p><strong>Fecha:</strong> 27 de Octubre de 2026</p>
        <p><strong>Hora:</strong> 18:00 PM</p>
        <p><strong>Lugar:</strong> [Nombre de la Iglesia/Lugar de la Ceremonia], [Dirección]</p>
        <button className="button">Ver en Mapa</button>
      </section>

      {/* Sección Fiesta */}
      <section id="fiesta" className="fiesta-section">
        <h2>Celebración</h2>
        <p>Después de la ceremonia, acompáñanos a celebrar nuestro amor con una gran fiesta.</p>
        <p><strong>Hora:</strong> 20:00 PM</p>
        <p><strong>Lugar:</strong> [Nombre del Salón/Lugar de la Fiesta], [Dirección]</p>
        <button className="button">Ver en Mapa</button>
      </section>

      {/* Sección Galería */}
      <section id="galeria" className="galeria-section">
        <h2>Nuestra Historia en Imágenes</h2>
        <p>Un vistazo a los momentos que nos han traído hasta aquí.</p>
        <div className="image-grid">
          {/* Aquí irían las imágenes de la galería */}
          <div className="gallery-item"></div>
          <div className="gallery-item"></div>
          <div className="gallery-item"></div>
        </div>
        <button className="button">Ver Más Fotos</button>
      </section>

      {/* Sección Regalos */}
      <section id="regalos" className="regalos-section">
        <h2>Mesa de Regalos</h2>
        <p>Tu presencia es nuestro mayor regalo, pero si deseas obsequiarnos algo, aquí tienes algunas opciones.</p>
        <button className="button" onClick={openGiftModal}>Ver Opciones de Regalo</button>
      </section>

      {/* Sección Instagram */}
      <section id="instagram" className="instagram-section">
        <h2>#NuestroGranDía</h2>
        <p>Comparte tus fotos y momentos usando nuestro hashtag oficial.</p>
        <div className="instagram-feed">
          {/* Aquí se integrarían las publicaciones de Instagram */}
          <div className="instagram-post"></div>
          <div className="instagram-post"></div>
        </div>
        <button className="button">Síguenos en Instagram</button>
      </section>

      {/* Sección RSVP */}
      <section id="rsvp" className="rsvp-section">
        <h2>Confirma tu Asistencia</h2>
        <p>Por favor, ayúdanos a planificar este día tan especial confirmando tu asistencia antes del [Fecha Límite].</p>
        <button className="button" onClick={openRsvpModal}>Confirmar Ahora</button>
      </section>

      {/* Sección Canciones */}
      <section id="canciones" className="canciones-section">
        <h2>Sugerencias Musicales</h2>
        <p>¿Qué canción te gustaría bailar en nuestra fiesta? ¡Haz tu sugerencia!</p>
        <button className="button">Sugerir Canción</button>
      </section>

      {/* Sección Info Útil */}
      <section id="info-util" className="info-util-section">
        <h2>Información Útil para Nuestros Invitados</h2>
        <p>Aquí encontrarás detalles sobre alojamiento, transporte y otros datos importantes.</p>
        <button className="button" onClick={openInfoModal}>Ver Información Detallada</button>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <p>&copy; 2025 [Nombre Novia] & [Nombre Novio]. Todos los derechos reservados.</p>
        <p>Diseñado con amor para nuestro gran día.</p>
      </footer>

      {/* Modales */}
      {showRsvpModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirmar Asistencia</h3>
            <p>Formulario de RSVP aquí...</p>
            <button className="button" onClick={closeRsvpModal}>Cerrar</button>
          </div>
        </div>
      )}

      {showGiftModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Opciones de Regalo</h3>
            <p>Información de la mesa de regalos, cuentas bancarias, etc.</p>
            <button className="button" onClick={closeGiftModal}>Cerrar</button>
          </div>
        </div>
      )}

      {showInfoModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Información Detallada</h3>
            <p>Detalles sobre hoteles, transporte, código de vestimenta, etc.</p>
            <button className="button" onClick={closeInfoModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeddingClassicTemplate;

