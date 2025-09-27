import React, { useState } from 'react';
import './QuinceaneraElegantTemplate.css';

// Importar componentes modulares
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Ceremony from './components/Ceremony';
import Party from './components/Party';
import Gallery from './components/Gallery';
import Gifts from './components/Gifts';
import Instagram from './components/Instagram';
import RSVP from './components/RSVP';
import Songs from './components/Songs';
import UsefulInfo from './components/UsefulInfo';
import Footer from './components/Footer';
import Modal from './components/Modal';

const QuinceaneraElegantTemplate = () => {
  // Definir estilos para colores y fuentes
  const primaryColor = '#D4AF37';
  const secondaryColor = '#F5E6D3';
  const playfairDisplayFont = 'Playfair Display, serif';
  const dancingScriptFont = 'Dancing Script, cursive';

  // Estados para contenido editable y visibilidad de secciones
  const [heroTitle, setHeroTitle] = useState('Mis Quince Años');
  const [heroSubtitle, setHeroSubtitle] = useState('¡Te esperamos para celebrar!');
  const [showCountdown, setShowCountdown] = useState(true);
  const [showCeremony, setShowCeremony] = useState(true);
  const [showParty, setShowParty] = useState(true);
  const [showGallery, setShowGallery] = useState(true);
  const [showGifts, setShowGifts] = useState(true);
  const [showInstagram, setShowInstagram] = useState(true);
  const [showRSVP, setShowRSVP] = useState(true);
  const [showSongs, setShowSongs] = useState(true);
  const [showUsefulInfo, setShowUsefulInfo] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const quinceaneraDate = '2026-09-27T19:00:00'; // Ejemplo de fecha

  return (
    <div style={{
      '--primary-color': primaryColor,
      '--secondary-color': secondaryColor,
      '--font-playfair-display': playfairDisplayFont,
      '--font-dancing-script': dancingScriptFont,
    }}>
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        onTitleChange={setHeroTitle}
        onSubtitleChange={setHeroSubtitle}
        backgroundColor={secondaryColor}
        textColor={primaryColor}
        fontFamilyTitle={dancingScriptFont}
        fontFamilySubtitle={playfairDisplayFont}
      />

      {showCountdown && (
        <Countdown
          targetDate={quinceaneraDate}
          titleColor={primaryColor}
          textColor={primaryColor}
          backgroundColor={secondaryColor}
          fontFamily={playfairDisplayFont}
        />
      )}

      {showCeremony && (
        <Ceremony
          title="Ceremonia Religiosa"
          date="27 de Septiembre de 2026"
          time="17:00 hrs"
          location="Parroquia de Nuestra Señora de Guadalupe"
          address="Calle Falsa 123, Ciudad"
          mapLink="https://maps.google.com/?q=Parroquia+de+Nuestra+Se%C3%B1ora+de+Guadalupe"
          titleColor={primaryColor}
          textColor={primaryColor}
          backgroundColor={secondaryColor}
          fontFamilyTitle={dancingScriptFont}
          fontFamilyText={playfairDisplayFont}
        />
      )}

      {showParty && (
        <Party
          title="Recepción"
          date="27 de Septiembre de 2026"
          time="19:00 hrs"
          location="Salón de Eventos 'El Dorado'"
          address="Avenida Siempre Viva 742, Ciudad"
          mapLink="https://maps.google.com/?q=Sal%C3%B3n+de+Eventos+El+Dorado"
          titleColor={primaryColor}
          textColor={primaryColor}
          backgroundColor={secondaryColor}
          fontFamilyTitle={dancingScriptFont}
          fontFamilyText={playfairDisplayFont}
        />
      )}

      {showGallery && (
        <Gallery
          title="Galería de Fotos"
          images={[
            { src: '/images/quince1.jpg', alt: 'Quinceañera 1' },
            { src: '/images/quince2.jpg', alt: 'Quinceañera 2' },
          ]} // Ejemplo de imágenes
          titleColor={primaryColor}
          backgroundColor={secondaryColor}
          fontFamilyTitle={dancingScriptFont}
        />
      )}

      {showGifts && (
        <Gifts
          title="Mesa de Regalos"
          message="Tu presencia es nuestro mejor regalo, pero si deseas obsequiarnos algo, aquí tienes algunas opciones."
          bankInfo="Banco: XYZ, Cuenta: 1234567890"
          giftRegistryLink="https://listaderegalos.com/quinceanera"
          titleColor={primaryColor}
          textColor={primaryColor}
          backgroundColor={secondaryColor}
          fontFamilyTitle={dancingScriptFont}
          fontFamilyText={playfairDisplayFont}
        />
      )}

      {showInstagram && (
        <Instagram
          title="Comparte tus momentos"
          hashtag="#MisQuinceAños"
          titleColor={primaryColor}
          textColor={primaryColor}
          backgroundColor={secondaryColor}
          fontFamilyTitle={dancingScriptFont}
          fontFamilyText={playfairDisplayFont}
        />
      )}

      {showRSVP && (
        <RSVP
          title="Confirma tu Asistencia"
          deadline="15 de Septiembre de 2026"
          contactEmail="confirmacion@email.com"
          contactPhone="+1234567890"
          titleColor={primaryColor}
          textColor={primaryColor}
          backgroundColor={secondaryColor}
          fontFamilyTitle={dancingScriptFont}
          fontFamilyText={playfairDisplayFont}
        />
      )}

      {showSongs && (
        <Songs
          title="Pide tu Canción"
          message="Ayúdanos a crear la playlist perfecta para la fiesta."
          requestLink="https://pedircancion.com/quinceanera"
          titleColor={primaryColor}
          textColor={primaryColor}
          backgroundColor={secondaryColor}
          fontFamilyTitle={dancingScriptFont}
          fontFamilyText={playfairDisplayFont}
        />
      )}

      {showUsefulInfo && (
        <UsefulInfo
          title="Información Útil"
          sections={[
            { title: 'Código de Vestimenta', content: 'Formal' },
            { title: 'Alojamiento', content: 'Hoteles cercanos: [Link]' },
          ]}
          titleColor={primaryColor}
          textColor={primaryColor}
          backgroundColor={secondaryColor}
          fontFamilyTitle={dancingScriptFont}
          fontFamilyText={playfairDisplayFont}
        />
      )}

      <Footer
        text="¡Gracias por acompañarnos en este día tan especial!"
        textColor={primaryColor}
        backgroundColor={secondaryColor}
        fontFamily={playfairDisplayFont}
      />

      <button onClick={() => setIsModalOpen(true)}>Abrir Modal</button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Mensaje Especial"
        content="¡Estamos muy emocionados de celebrar contigo!"
        titleColor={primaryColor}
        textColor={primaryColor}
        backgroundColor={secondaryColor}
        fontFamilyTitle={dancingScriptFont}
        fontFamilyText={playfairDisplayFont}
      />
    </div>
  );
};

export default QuinceaneraElegantTemplate;

