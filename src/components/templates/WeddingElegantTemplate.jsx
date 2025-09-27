import React, { useState } from 'react';
import './WeddingElegantTemplate.css';
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

const WeddingElegantTemplate = () => {
  const [isCeremonyModalOpen, setIsCeremonyModalOpen] = useState(false);
  const [isPartyModalOpen, setIsPartyModalOpen] = useState(false);
  const [isGiftsModalOpen, setIsGiftsModalOpen] = useState(false);
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false);
  const [isSongsModalOpen, setIsSongsModalOpen] = useState(false);
  const [isUsefulInfoModalOpen, setIsUsefulInfoModalOpen] = useState(false);

  const openModal = (modalName) => {
    switch (modalName) {
      case 'ceremony': setIsCeremonyModalOpen(true); break;
      case 'party': setIsPartyModalOpen(true); break;
      case 'gifts': setIsGiftsModalOpen(true); break;
      case 'rsvp': setIsRSVPModalOpen(true); break;
      case 'songs': setIsSongsModalOpen(true); break;
      case 'usefulInfo': setIsUsefulInfoModalOpen(true); break;
      default: break;
    }
  };

  const closeModal = (modalName) => {
    switch (modalName) {
      case 'ceremony': setIsCeremonyModalOpen(false); break;
      case 'party': setIsPartyModalOpen(false); break;
      case 'gifts': setIsGiftsModalOpen(false); break;
      case 'rsvp': setIsRSVPModalOpen(false); break;
      case 'songs': setIsSongsModalOpen(false); break;
      case 'usefulInfo': setIsUsefulInfoModalOpen(false); break;
      default: break;
    }
  };

  return (
    <div className="wedding-elegant-template">
      <Hero />
      <Countdown />
      <Ceremony onOpenModal={() => openModal('ceremony')} />
      <Party onOpenModal={() => openModal('party')} />
      <Gallery />
      <Gifts onOpenModal={() => openModal('gifts')} />
      <Instagram />
      <RSVP onOpenModal={() => openModal('rsvp')} />
      <Songs onOpenModal={() => openModal('songs')} />
      <UsefulInfo onOpenModal={() => openModal('usefulInfo')} />
      <Footer />

      {/* Modales */}
      <Modal id="ceremony-modal" title="Detalles de la Ceremonia" isOpen={isCeremonyModalOpen} onClose={() => closeModal('ceremony')}>
        <p>Aquí irán los detalles específicos de la ceremonia: dirección, hora, mapa, etc.</p>
      </Modal>
      <Modal id="party-modal" title="Detalles de la Fiesta" isOpen={isPartyModalOpen} onClose={() => closeModal('party')}>
        <p>Aquí irán los detalles específicos de la fiesta: dirección, hora, mapa, etc.</p>
      </Modal>
      <Modal id="gifts-modal" title="Sugerencias de Regalos" isOpen={isGiftsModalOpen} onClose={() => closeModal('gifts')}>
        <p>Aquí irán las opciones de regalos: lista de bodas, número de cuenta, etc.</p>
      </Modal>
      <Modal id="rsvp-modal" title="Confirmar Asistencia" isOpen={isRSVPModalOpen} onClose={() => closeModal('rsvp')}>
        <p>Aquí irá el formulario para confirmar asistencia.</p>
      </Modal>
      <Modal id="songs-modal" title="Sugerir Canciones" isOpen={isSongsModalOpen} onClose={() => closeModal('songs')}>
        <p>Aquí irá un formulario para que los invitados sugieran canciones.</p>
      </Modal>
      <Modal id="useful-info-modal" title="Información Útil Adicional" isOpen={isUsefulInfoModalOpen} onClose={() => closeModal('usefulInfo')}>
        <p>Aquí irá información sobre alojamiento, transporte, peluquería, etc.</p>
      </Modal>
    </div>
  );
};

export default WeddingElegantTemplate;
