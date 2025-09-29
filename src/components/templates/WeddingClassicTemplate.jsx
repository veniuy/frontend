import React from 'react';
import './WeddingClassicTemplate.css';
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

const WeddingClassicTemplate = ({ data }) => {
  const { 
    hero, countdown, ceremony, party, gallery, gifts, instagram, rsvp, songs, usefulInfo, footer, modal 
  } = data;

  return (
    <div className="wedding-classic-template">
      {hero && <Hero {...hero} />}
      {countdown && <Countdown {...countdown} />}
      {ceremony && <Ceremony {...ceremony} />}
      {party && <Party {...party} />}
      {gallery && <Gallery {...gallery} />}
      {gifts && <Gifts {...gifts} />}
      {instagram && <Instagram {...instagram} />}
      {rsvp && <RSVP {...rsvp} />}
      {songs && <Songs {...songs} />}
      {usefulInfo && <UsefulInfo {...usefulInfo} />}
      {footer && <Footer {...footer} />}
      {modal && <Modal {...modal} />}
    </div>
  );
};

export default WeddingClassicTemplate;

