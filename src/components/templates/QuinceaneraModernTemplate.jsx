import React from 'react';

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

const QuinceaneraModernTemplate = ({ data }) => {
  const { 
    hero, countdown, ceremony, party, gallery, gifts, instagram, rsvp, songs, usefulInfo, footer, modal, 
    editable, // Para controlar la edición de contenido
    conditionalSections // Para controlar la visibilidad de secciones
  } = data;

  return (
    <div className="quinceanera-modern-template">
      {conditionalSections.hero && <Hero {...hero} editable={editable} />}
      {conditionalSections.countdown && <Countdown {...countdown} editable={editable} />}
      {conditionalSections.ceremony && <Ceremony {...ceremony} editable={editable} />}
      {conditionalSections.party && <Party {...party} editable={editable} />}
      {conditionalSections.gallery && <Gallery {...gallery} editable={editable} />}
      {conditionalSections.gifts && <Gifts {...gifts} editable={editable} />}
      {conditionalSections.instagram && <Instagram {...instagram} editable={editable} />}
      {conditionalSections.rsvp && <RSVP {...rsvp} editable={editable} />}
      {conditionalSections.songs && <Songs {...songs} editable={editable} />}
      {conditionalSections.usefulInfo && <UsefulInfo {...usefulInfo} editable={editable} />}
      {conditionalSections.footer && <Footer {...footer} editable={editable} />}
      {conditionalSections.modal && <Modal {...modal} editable={editable} />}
    </div>
  );
};

export default QuinceaneraModernTemplate;

