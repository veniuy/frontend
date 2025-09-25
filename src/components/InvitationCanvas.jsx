// src/components/InvitationCanvas(4).jsx
import React from "react";
import TemplateRenderer from "./TemplateRenderer.jsx";

export default function InvitationCanvas({ event, ui, setEvent }) {
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            Selecciona una plantilla para comenzar
          </h2>
          <p className="text-gray-500">
            Usa el editor para elegir el tipo de evento y plantilla
          </p>
        </div>
      </div>
    );
  }

  // Usar el TemplateRenderer para mostrar la plantilla correcta
  return <TemplateRenderer event={event} ui={ui} setEvent={setEvent} />;
}
