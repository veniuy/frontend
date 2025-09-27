import React from 'react';
import './WeddingRomanticTemplate.css'; // Importa el archivo CSS específico

// Importar todos los componentes modulares
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

const WeddingRomanticTemplate = ({ config }) => {
  return (
    <div className="wedding-romantic-template">
      {/* Aquí se renderizarán los componentes modulares */}
      {/* Ejemplo de cómo se usarían los componentes con la configuración editable */}
      {config.hero && <Hero {...config.hero} />}
      {config.countdown && <Countdown {...config.countdown} />}
      {config.ceremony && <Ceremony {...config.ceremony} />}
      {config.party && <Party {...config.party} />}
      {config.gallery && <Gallery {...config.gallery} />}
      {config.gifts && <Gifts {...config.gifts} />}
      {config.instagram && <Instagram {...config.instagram} />}
      {config.rsvp && <RSVP {...config.rsvp} />}
      {config.songs && <Songs {...config.songs} />}
      {config.usefulInfo && <UsefulInfo {...config.usefulInfo} />}
      {config.footer && <Footer {...config.footer} />}
      {config.modal && <Modal {...config.modal} />}
    </div>
  );
};

export default WeddingRomanticTemplate;

