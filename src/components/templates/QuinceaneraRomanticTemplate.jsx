import React from 'react';
import './QuinceaneraRomanticTemplate.css';

// Importar componentes modulares
import Hero from '../components/Hero';
import Countdown from '../components/Countdown';
import Ceremony from '../components/Ceremony';
import Party from '../components/Party';
import Gallery from '../components/Gallery';
import Gifts from '../components/Gifts';
import Instagram from '../components/Instagram';
import RSVP from '../components/RSVP';
import Songs from '../components/Songs';
import UsefulInfo from '../components/UsefulInfo';
import Footer from '../components/Footer';
import Modal from '../components/Modal';

const QuinceaneraRomanticTemplate = ({ config }) => {
  return (
    <div className="quinceanera-romantic-template">
      <Hero config={config.hero} />
      {config.countdown.enabled && <Countdown config={config.countdown} />}
      {config.ceremony.enabled && <Ceremony config={config.ceremony} />}
      {config.party.enabled && <Party config={config.party} />}
      {config.gallery.enabled && <Gallery config={config.gallery} />}
      {config.gifts.enabled && <Gifts config={config.gifts} />}
      {config.instagram.enabled && <Instagram config={config.instagram} />}
      {config.rsvp.enabled && <RSVP config={config.rsvp} />}
      {config.songs.enabled && <Songs config={config.songs} />}
      {config.usefulInfo.enabled && <UsefulInfo config={config.usefulInfo} />}
      <Footer config={config.footer} />
      {config.modal.enabled && <Modal config={config.modal} />}
    </div>
  );
};

export default QuinceaneraRomanticTemplate;

