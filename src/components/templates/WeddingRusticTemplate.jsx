import React, { useState } from 'react';
import './WeddingRusticTemplate.css'; // Para los estilos

const WeddingRusticTemplate = () => {
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);
  const [isGiftsModalOpen, setIsGiftsModalOpen] = useState(false);
  const [isSongsModalOpen, setIsSongsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const openRsvpModal = () => setIsRsvpModalOpen(true);
  const closeRsvpModal = () => setIsRsvpModalOpen(false);

  const openGiftsModal = () => setIsGiftsModalOpen(true);
  const closeGiftsModal = () => setIsGiftsModalOpen(false);

  const openSongsModal = () => setIsSongsModalOpen(true);
  const closeSongsModal = () => setIsSongsModalOpen(false);

  const openInfoModal = () => setIsInfoModalOpen(true);
  const closeInfoModal = () => setIsInfoModalOpen(false);

  return (
    <div className="wedding-rustic-template">
      {/* Sección Hero */}
      <section id="hero" className="hero-section">
        <h1>Nuestra Boda Rústica</h1>
        <p>¡Estás invitado a celebrar nuestro amor!</p>
      </section>

      {/* Sección Countdown */}
      <section id="countdown" className="countdown-section">
        <h2>Cuenta Regresiva</h2>
        <div className="countdown-timer"></div>
        <p>¡Faltan X días para el gran día!</p>
      </section>

      {/* Sección Ceremonia */}
      <section id="ceremonia" className="ceremonia-section">
        <h2>Ceremonia</h2>
        <p>Únete a nosotros para presenciar nuestro sagrado vínculo.</p>
        <p>Fecha: 15 de Octubre de 2025</p>
        <p>Hora: 16:00 PM</p>
        <p>Lugar: Capilla del Bosque Encantado</p>
        <button>Ver Mapa</button>
      </section>

      {/* Sección Fiesta */}
      <section id="fiesta" className="fiesta-section">
        <h2>Celebración</h2>
        <p>Después de la ceremonia, ¡a celebrar!</p>
        <p>Hora: 18:00 PM</p>
        <p>Lugar: Salón Campestre La Arboleda</p>
        <button>Ver Mapa</button>
      </section>

      {/* Sección Galería */}
      <section id="galeria" className="galeria-section">
        <h2>Nuestra Historia en Imágenes</h2>
        <div className="image-grid">
          {/* Imágenes de ejemplo */}
          <img src="https://via.placeholder.com/250x250?text=Foto+1" alt="Foto de boda 1" />
          <img src="https://via.placeholder.com/250x250?text=Foto+2" alt="Foto de boda 2" />
          <img src="https://via.placeholder.com/250x250?text=Foto+3" alt="Foto de boda 3" />
        </div>
        <button>Ver Más Fotos</button>
      </section>

      {/* Sección Regalos */}
      <section id="regalos" className="regalos-section">
        <h2>Lista de Regalos</h2>
        <p>Tu presencia es nuestro mayor regalo, pero si deseas obsequiarnos algo...</p>
        <button onClick={openGiftsModal}>Ver Opciones de Regalo</button>
      </section>

      {/* Sección Instagram */}
      <section id="instagram" className="instagram-section">
        <h2>#NuestraBodaRústica</h2>
        <p>Comparte tus momentos con nosotros en Instagram.</p>
        <button>Síguenos en Instagram</button>
      </section>

      {/* Sección RSVP */}
      <section id="rsvp" className="rsvp-section">
        <h2>Confirma tu Asistencia</h2>
        <p>Por favor, confirma tu asistencia antes del 1 de Octubre.</p>
        <button onClick={openRsvpModal}>Confirmar Asistencia</button>
      </section>

      {/* Sección Canciones */}
      <section id="canciones" className="canciones-section">
        <h2>Pide tu Canción</h2>
        <p>Ayúdanos a crear la playlist perfecta para la fiesta.</p>
        <button onClick={openSongsModal}>Sugerir Canción</button>
      </section>

      {/* Sección Info Útil */}
      <section id="info-util" className="info-util-section">
        <h2>Información Útil</h2>
        <p>Aquí encontrarás detalles sobre alojamiento, transporte y más.</p>
        <button onClick={openInfoModal}>Ver Detalles</button>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <p>&copy; 2025 [Nombres de los Novios]. Todos los derechos reservados.</p>
      </footer>

      {/* Modales */}
      {isRsvpModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirmar Asistencia</h3>
            <p>Formulario de RSVP aquí...</p>
            <button onClick={closeRsvpModal}>Cerrar</button>
          </div>
        </div>
      )}

      {isGiftsModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Opciones de Regalo</h3>
            <p>Información de la mesa de regalos o cuenta bancaria...</p>
            <button onClick={closeGiftsModal}>Cerrar</button>
          </div>
        </div>
      )}

      {isSongsModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Sugerir Canción</h3>
            <p>Formulario para sugerir canciones...</p>
            <button onClick={closeSongsModal}>Cerrar</button>
          </div>
        </div>
      )}

      {isInfoModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Información Adicional</h3>
            <p>Detalles sobre hoteles, rutas, códigos de vestimenta...</p>
            <button onClick={closeInfoModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeddingRusticTemplate;
