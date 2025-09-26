import React from 'react';
import './QuinceaneraElegantTemplate.css';

const QuinceaneraElegantTemplate = () => {
  return (
    <div className="quinceanera-elegant-template">
      {/* Sección Hero */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <h1>[Nombre de la Quinceañera]</h1>
          <p className="event-title">MIS 15 AÑOS</p>
          <p className="event-date">[Fecha del Evento]</p>
          <button className="main-button">Confirmar Mi Asistencia</button>
        </div>
      </section>

      {/* Sección Countdown */}
      <section id="countdown" className="countdown-section">
        <h2>Mi Cuenta Regresiva</h2>
        {/* Placeholder para el componente de cuenta regresiva */}
        <div className="countdown-placeholder">[Componente de Cuenta Regresiva]</div>
      </section>

      {/* Sección Celebración */}
      <section id="celebration" className="celebration-section">
        <h2>Mi Celebración</h2>
        <p>[Detalles de mi celebración: lugar, hora, dirección]</p>
        <button className="info-button">Ver Ubicación</button>
      </section>

      {/* Sección Galería */}
      <section id="gallery" className="gallery-section">
        <h2>Mi Galería</h2>
        {/* Placeholder para el componente de galería de fotos */}
        <div className="gallery-placeholder">[Componente de Galería de Fotos]</div>
      </section>

      {/* Sección Regalos */}
      <section id="gifts" className="gifts-section">
        <h2>Mis Regalos</h2>
        <p>[Información sobre mi mesa de regalos o sugerencias de regalos]</p>
        <button className="info-button">Ver Opciones de Regalo</button>
      </section>

      {/* Sección Instagram */}
      <section id="instagram" className="instagram-section">
        <h2>#Mis15Años</h2>
        {/* Placeholder para el feed de Instagram */}
        <div className="instagram-placeholder">[Feed de Instagram]</div>
      </section>

      {/* Sección RSVP */}
      <section id="rsvp" className="rsvp-section">
        <h2>Confirmar Mi Asistencia</h2>
        {/* Placeholder para el formulario RSVP */}
        <div className="rsvp-placeholder">[Formulario RSVP]</div>
      </section>

      {/* Sección Canciones */}
      <section id="songs" className="songs-section">
        <h2>Pide Mi Canción Favorita</h2>
        {/* Placeholder para el formulario de solicitud de canciones */}
        <div className="songs-placeholder">[Formulario de Solicitud de Canciones]</div>
      </section>

      {/* Sección Información Útil */}
      <section id="useful-info" className="useful-info-section">
        <h2>Información Útil para Mis Invitados</h2>
        <p>[Detalles de alojamiento, transporte, código de vestimenta, etc.]</p>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <p>&copy; 2025 Mis 15 Años de [Nombre de la Quinceañera]. Todos los derechos reservados.</p>
      </footer>

      {/* Modales (ej. para detalles de regalos, ubicación, etc.) */}
      <div id="gift-modal" className="modal">
        <div className="modal-content">
          <h3>Detalles de Regalos</h3>
          <p>[Contenido del modal de regalos]</p>
          <button className="close-modal">Cerrar</button>
        </div>
      </div>

      <div id="location-modal" className="modal">
        <div className="modal-content">
          <h3>Ubicación de Mi Celebración</h3>
          <p>[Contenido del modal de ubicación]</p>
          <button className="close-modal">Cerrar</button>
        </div>
      </div>

      {/* Otros modales según sea necesario */}

    </div>
  );
};

export default QuinceaneraElegantTemplate;

