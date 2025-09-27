import React from 'react';
import './WeddingModernTemplate.css';

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

const WeddingModernTemplate = ({
  editable = false,
  showCountdown = true,
  showGallery = true,
  showGifts = true,
  showInstagram = true,
  showRSVP = true,
  showSongs = true,
  showUsefulInfo = true,
}) => {
  return (
    <div className="wedding-modern-template">
      <Hero editable={editable} />
      {showCountdown && <Countdown editable={editable} />}
      <Ceremony editable={editable} />
      <Party editable={editable} />
      {showGallery && <Gallery editable={editable} />}
      {showGifts && <Gifts editable={editable} />}
      {showInstagram && <Instagram editable={editable} />}
      {showRSVP && <RSVP editable={editable} />}
      {showSongs && <Songs editable={editable} />}
      {showUsefulInfo && <UsefulInfo editable={editable} />}
      <Footer editable={editable} />
      <Modal editable={editable} />
    </div>
  );
};

export default WeddingModernTemplate;

