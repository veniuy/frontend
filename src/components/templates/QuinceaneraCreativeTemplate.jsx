import React from 'react';

// Importa los componentes modulares
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

const QuinceaneraCreativeTemplate = ({ content, settings }) => {
  return (
    <div className="quinceanera-creative-template">
      {settings.showHero && <Hero content={content.hero} settings={settings.hero} />}
      {settings.showCountdown && <Countdown content={content.countdown} settings={settings.countdown} />}
      {settings.showCeremony && <Ceremony content={content.ceremony} settings={settings.ceremony} />}
      {settings.showParty && <Party content={content.party} settings={settings.party} />}
      {settings.showGallery && <Gallery content={content.gallery} settings={settings.gallery} />}
      {settings.showGifts && <Gifts content={content.gifts} settings={settings.gifts} />}
      {settings.showInstagram && <Instagram content={content.instagram} settings={settings.instagram} />}
      {settings.showRSVP && <RSVP content={content.rsvp} settings={settings.rsvp} />}
      {settings.showSongs && <Songs content={content.songs} settings={settings.songs} />}
      {settings.showUsefulInfo && <UsefulInfo content={content.usefulInfo} settings={settings.usefulInfo} />}
      {settings.showFooter && <Footer content={content.footer} settings={settings.footer} />}
      {settings.showModal && <Modal content={content.modal} settings={settings.modal} />}
    </div>
  );
};

export default QuinceaneraCreativeTemplate;

