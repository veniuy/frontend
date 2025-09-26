import React, { useState } from 'react';
import './WeddingRomanticTemplate.css';

const WeddingRomanticTemplate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  return (
    <div className="wedding-romantic-template">
      {/* Sección Hero */}
      <section id="hero" className="hero-section">
        <h1>Nuestro Amor, Nuestra Boda</h1>
        <p>¡Con el corazón lleno de alegría, te invitamos a celebrar el inicio de nuestra historia juntos!</p>
        <button onClick={() => openModal("¡Bienvenido a nuestra boda! Aquí encontrarás toda la información para compartir este día tan especial con nosotros.")}>Descubre Más</button>
      </section>

      {/* Sección Countdown */}
      <section id="countdown" className="countdown-section">
        <h2>El Gran Día se Acerca...</h2>
        <p>Faltan [Días] días, [Horas] horas, [Minutos] minutos, [Segundos] segundos</p>
        {/* Aquí iría un componente de cuenta regresiva real */}
      </section>

      {/* Sección Ceremonia */}
      <section id="ceremonia" className="ceremonia-section">
        <h2>La Promesa Eterna</h2>
        <p>Únete a nosotros para presenciar el momento en que uniremos nuestras vidas en sagrado matrimonio.</p>
        <p><strong>Fecha:</strong> [Fecha de la Ceremonia]</p>
        <p><strong>Hora:</strong> [Hora de la Ceremonia]</p>
        <p><strong>Lugar:</strong> [Nombre del Lugar de la Ceremonia], [Dirección]</p>
        <button onClick={() => openModal("Detalles de la Ceremonia: Por favor, llega con 15 minutos de antelación. Se ruega vestir de [código de vestimenta].")}>Ver Detalles</button>
      </section>

      {/* Sección Fiesta */}
      <section id="fiesta" className="fiesta-section">
        <h2>Celebrando el Amor</h2>
        <p>Después de la ceremonia, te esperamos para brindar y celebrar nuestro amor con una gran fiesta.</p>
        <p><strong>Fecha:</strong> [Fecha de la Fiesta]</p>
        <p><strong>Hora:</strong> [Hora de la Fiesta]</p>
        <p><strong>Lugar:</strong> [Nombre del Lugar de la Fiesta], [Dirección]</p>
        <button onClick={() => openModal("Detalles de la Fiesta: Habrá cena, baile y muchas sorpresas. ¡Prepárate para disfrutar!")}>Más Información</button>
      </section>

      {/* Sección Galería */}
      <section id="galeria" className="galeria-section">
        <h2>Nuestros Momentos</h2>
        <p>Un vistazo a nuestra historia de amor a través de imágenes.</p>
        {/* Aquí iría un componente de galería de fotos real */}
        <button onClick={() => openModal("Galería de Fotos: Próximamente subiremos más fotos de nuestros momentos especiales.")}>Ver Galería</button>
      </section>

      {/* Sección Regalos */}
      <section id="regalos" className="regalos-section">
        <h2>Tu Presencia es Nuestro Mejor Regalo</h2>
        <p>Si deseas hacernos un obsequio, aquí tienes algunas sugerencias.</p>
        <button onClick={() => openModal("Lista de Regalos: Hemos preparado una lista de deseos en [Tienda/Web]. ¡Gracias por tu generosidad!")}>Ver Lista</button>
      </section>

      {/* Sección Instagram */}
      <section id="instagram" className="instagram-section">
        <h2>#NuestroGranDíaRomántico</h2>
        <p>Comparte tus fotos con nosotros usando nuestro hashtag.</p>
        {/* Aquí iría un componente de feed de Instagram real */}
      </section>

      {/* Sección RSVP */}
      <section id="rsvp" className="rsvp-section">
        <h2>Confirma tu Asistencia</h2>
        <p>Por favor, haznos saber si podrás acompañarnos antes del [Fecha Límite RSVP].</p>
        {/* Aquí iría un formulario RSVP real */}
        <button onClick={() => openModal("Formulario RSVP: Por favor, rellena el formulario con tus datos y preferencias alimentarias.")}>Confirmar Asistencia</button>
      </section>

      {/* Sección Canciones */}
      <section id="canciones" className="canciones-section">
        <h2>¡Que no falte tu Canción!</h2>
        <p>Ayúdanos a crear la banda sonora perfecta para nuestra fiesta. Pide tu canción favorita.</p>
        {/* Aquí iría un formulario para pedir canciones real */}
        <button onClick={() => openModal("Pide tu Canción: Sugiere la canción que te gustaría bailar en nuestra fiesta.")}>Pedir Canción</button>
      </section>

      {/* Sección Info Útil */}
      <section id="info-util" className="info-util-section">
        <h2>Información para Nuestros Invitados</h2>
        <p>Aquí encontrarás detalles sobre alojamiento, transporte y otros datos importantes.</p>
        <button onClick={() => openModal("Información Útil: Hemos reservado habitaciones con descuento en [Hotel]. Consulta las opciones de transporte en la sección de preguntas frecuentes.")}>Ver Info</button>
      </section>

      {/* Sección Footer */}
      <footer className="footer-section">
        <p>&copy; 2025 [Nombres de los Novios]. Con Amor.</p>
      </footer>

      {/* Modal Component */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-button" onClick={closeModal}>&times;</button>
            <p>{modalContent}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeddingRomanticTemplate;

