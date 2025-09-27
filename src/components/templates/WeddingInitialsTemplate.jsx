import React from 'react';
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
import './styles/WeddingInitialsTemplate.css'; // Importar el archivo CSS

const WeddingInitialsTemplate = ({ config }) => {
  const { 
    showHero, showCountdown, showCeremony, showParty, showGallery, showGifts, 
    showInstagram, showRSVP, showSongs, showUsefulInfo, showFooter, showModal 
  } = config || {};

  return (
    <div className="wedding-initials-template">
      {showHero && <Hero config={config?.hero} />}
      {showCountdown && <Countdown config={config?.countdown} />}
      {showCeremony && <Ceremony config={config?.ceremony} />}
      {showParty && <Party config={config?.party} />}
      {showGallery && <Gallery config={config?.gallery} />}
      {showGifts && <Gifts config={config?.gifts} />}
      {showInstagram && <Instagram config={config?.instagram} />}
      {showRSVP && <RSVP config={config?.rsvp} />}
      {showSongs && <Songs config={config?.songs} />}
      {showUsefulInfo && <UsefulInfo config={config?.usefulInfo} />}
      {showFooter && <Footer config={config?.footer} />}
      {showModal && <Modal config={config?.modal} />}
    </div>
  );
};

export default WeddingInitialsTemplate;

