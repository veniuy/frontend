import React from 'react';

const WeddingModernTemplate = () => {
  const primaryColor = '#245D63';
  const secondaryColor = '#8F9AA7';
  const interFont = 'Inter, sans-serif';
  const alexBrushFont = '\"Alex Brush\", cursive';

  return (
    <div className="wedding-modern-template" style={{
      '--primary-color': primaryColor,
      '--secondary-color': secondaryColor,
      '--font-inter': interFont,
      '--font-alex-brush': alexBrushFont,
      fontFamily: 'var(--font-inter)',
      color: 'var(--primary-color)'
    }}>

      {/* Sección Hero */}
      <section id="hero" style={{ textAlign: 'center', padding: '50px 20px' }}>
        <h1 style={{ fontFamily: 'var(--font-alex-brush)' }}>Nuestra Boda</h1>
        <p>¡Te esperamos para celebrar nuestro amor!</p>
        <button style={{ backgroundColor: 'var(--primary-color)', color: 'white', fontFamily: 'var(--font-inter)', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>Ver Detalles</button>
      </section>

      {/* Sección Countdown */}
      <section id="countdown" style={{ textAlign: 'center', padding: '50px 20px', backgroundColor: '#f8f8f8' }}>
        <h2 style={{ fontFamily: 'var(--font-alex-brush)' }}>Faltan...</h2>
        <div className="countdown-timer">XX días XX horas XX minutos XX segundos</div>
      </section>

      {/* Sección Ceremonia */}
      <section id="ceremonia" style={{ textAlign: 'center', padding: '50px 20px' }}>
        <h2 style={{ fontFamily: 'var(--font-alex-brush)' }}>Ceremonia</h2>
        <p>Fecha, hora y lugar de la ceremonia.</p>
        <button style={{ backgroundColor: 'var(--primary-color)', color: 'white', fontFamily: 'var(--font-inter)', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>Cómo llegar</button>
      </section>

      {/* Sección Fiesta */}
      <section id="fiesta" style={{ textAlign: 'center', padding: '50px 20px', backgroundColor: '#f8f8f8' }}>
        <h2 style={{ fontFamily: 'var(--font-alex-brush)' }}>Celebración</h2>
        <p>Fecha, hora y lugar de la fiesta.</p>
        <button style={{ backgroundColor: 'var(--primary-color)', color: 'white', fontFamily: 'var(--font-inter)', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>Cómo llegar</button>
      </section>

      {/* Sección Galería */}
      <section id="galeria" style={{ textAlign: 'center', padding: '50px 20px' }}>
        <h2 style={{ fontFamily: 'var(--font-alex-brush)' }}>Nuestra Galería</h2>
        <div className="image-grid">[Imágenes de la pareja]</div>
      </section>

      {/* Sección Regalos */}
      <section id="regalos" style={{ textAlign: 'center', padding: '50px 20px', backgroundColor: '#f8f8f8' }}>
        <h2 style={{ fontFamily: 'var(--font-alex-brush)' }}>Lista de Regalos</h2>
        <p>Si deseas hacernos un regalo, aquí tienes algunas opciones.</p>
        <button style={{ backgroundColor: 'var(--primary-color)', color: 'white', fontFamily: 'var(--font-inter)', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>Ver opciones</button>
      </section>

      {/* Sección Instagram */}
      <section id="instagram" style={{ textAlign: 'center', padding: '50px 20px' }}>
        <h2 style={{ fontFamily: 'var(--font-alex-brush)' }}>#NuestroMatrimonio</h2>
        <p>Comparte tus momentos con nosotros en Instagram.</p>
        <button style={{ backgroundColor: 'var(--primary-color)', color: 'white', fontFamily: 'var(--font-inter)', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>Ver en Instagram</button>
      </section>

      {/* Sección RSVP */}
      <section id="rsvp" style={{ textAlign: 'center', padding: '50px 20px', backgroundColor: '#f8f8f8' }}>
        <h2 style={{ fontFamily: 'var(--font-alex-brush)' }}>Confirma tu Asistencia</h2>
        <p>Por favor, confírmanos si podrás acompañarnos.</p>
        <button style={{ backgroundColor: 'var(--primary-color)', color: 'white', fontFamily: 'var(--font-inter)', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>Confirmar</button>
      </section>

      {/* Sección Canciones */}
      <section id="canciones" style={{ textAlign: 'center', padding: '50px 20px' }}>
        <h2 style={{ fontFamily: 'var(--font-alex-brush)' }}>Pide tu Canción</h2>
        <p>Ayúdanos a crear la playlist perfecta para la fiesta.</p>
        <button style={{ backgroundColor: 'var(--primary-color)', color: 'white', fontFamily: 'var(--font-inter)', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>Sugerir Canción</button>
      </section>

      {/* Sección Info Útil */}
      <section id="info-util" style={{ textAlign: 'center', padding: '50px 20px', backgroundColor: '#f8f8f8' }}>
        <h2 style={{ fontFamily: 'var(--font-alex-brush)' }}>Información Útil</h2>
        <p>Hospedaje, transporte y otros detalles importantes.</p>
        <button style={{ backgroundColor: 'var(--primary-color)', color: 'white', fontFamily: 'var(--font-inter)', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>Más información</button>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: 'var(--primary-color)', color: 'white' }}>
        <p>&copy; 2025 [Nombres de la Pareja]. Todos los derechos reservados.</p>
      </footer>

      {/* Modales (ejemplos) */}
      <div className="modal-container">
        {/* Modal de Detalles */}
        <div id="detalles-modal" className="modal" style={{ display: 'none' }}>
          <div className="modal-content" style={{ backgroundColor: 'white', margin: '15% auto', padding: '20px', border: '1px solid #888', width: '80%' }}>
            <h3 style={{ fontFamily: 'var(--font-alex-brush)' }}>Detalles del Evento</h3>
            <p>Información detallada sobre la boda.</p>
            <button>Cerrar</button>
          </div>
        </div>

        {/* Modal de RSVP */}
        <div id="rsvp-modal" className="modal" style={{ display: 'none' }}>
          <div className="modal-content" style={{ backgroundColor: 'white', margin: '15% auto', padding: '20px', border: '1px solid #888', width: '80%' }}>
            <h3 style={{ fontFamily: 'var(--font-alex-brush)' }}>Confirmar Asistencia</h3>
            <form>[Formulario RSVP]</form>
            <button>Cerrar</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default WeddingModernTemplate;

