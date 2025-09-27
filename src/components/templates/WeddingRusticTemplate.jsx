import React from 'react';
import './WeddingRusticTemplate.css';

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

const WeddingRusticTemplate = () => {
  const colors = {
    primary: '#5A6C48',
    secondary: '#E0C9C9',
  };

  const fonts = {
    heading: 'Playfair Display, serif',
    body: 'Dancing Script, cursive',
  };

  // Ejemplo de datos editables y condicionales
  const heroData = {
    title: '¡Nos Casamos!',
    names: 'Ana & Pablo',
    date: '27 de Septiembre, 2025',
    image: 'https://example.com/rustic-hero.jpg',
    showCountdown: true,
  };

  const countdownData = {
    targetDate: '2025-09-27T18:00:00',
  };

  const ceremonyData = {
    title: 'Ceremonia',
    location: 'Iglesia de San Juan',
    address: 'Calle Mayor, 1, Pueblo',
    time: '18:00',
    showCeremony: true,
  };

  const partyData = {
    title: 'Celebración',
    location: 'Finca La Rústica',
    address: 'Camino del Bosque, s/n, Afueras',
    time: '20:00',
    showParty: true,
  };

  const galleryData = {
    images: [
      'https://example.com/rustic-gallery-1.jpg',
      'https://example.com/rustic-gallery-2.jpg',
      'https://example.com/rustic-gallery-3.jpg',
    ],
    showGallery: true,
  };

  const giftsData = {
    title: 'Regalos',
    message: 'Vuestra presencia es nuestro mejor regalo, pero si deseáis tener un detalle, aquí tenéis algunas opciones.',
    bankAccount: 'ES12 3456 7890 1234 5678 9012',
    showGifts: true,
  };

  const instagramData = {
    hashtag: '#AnaYPabloRustic',
    showInstagram: true,
  };

  const rsvpData = {
    title: 'Confirma tu asistencia',
    deadline: '01 de Septiembre, 2025',
    showRSVP: true,
  };

  const songsData = {
    title: 'Pide tu canción',
    message: 'Ayúdanos a crear la playlist perfecta para la fiesta.',
    showSongs: true,
  };

  const usefulInfoData = {
    title: 'Información útil',
    accommodation: 'Hoteles cercanos: Hotel Rural El Descanso, Casa de Campo La Abuela.',
    transport: 'Servicio de autobús desde el centro del pueblo.',
    showUsefulInfo: true,
  };

  const footerData = {
    message: '¡Os esperamos con mucha ilusión!',
  };

  const modalData = {
    isOpen: false,
    onClose: () => console.log('Modal cerrado'),
    content: 'Este es un modal de ejemplo.',
  };

  return (
    <div className="wedding-rustic-template" style={{ fontFamily: fonts.body, color: colors.primary }}>
      <Hero data={heroData} colors={colors} fonts={fonts} />
      {heroData.showCountdown && <Countdown data={countdownData} colors={colors} fonts={fonts} />}
      {ceremonyData.showCeremony && <Ceremony data={ceremonyData} colors={colors} fonts={fonts} />}
      {partyData.showParty && <Party data={partyData} colors={colors} fonts={fonts} />}
      {galleryData.showGallery && <Gallery data={galleryData} colors={colors} fonts={fonts} />}
      {giftsData.showGifts && <Gifts data={giftsData} colors={colors} fonts={fonts} />}
      {instagramData.showInstagram && <Instagram data={instagramData} colors={colors} fonts={fonts} />}
      {rsvpData.showRSVP && <RSVP data={rsvpData} colors={colors} fonts={fonts} />}
      {songsData.showSongs && <Songs data={songsData} colors={colors} fonts={fonts} />}
      {usefulInfoData.showUsefulInfo && <UsefulInfo data={usefulInfoData} colors={colors} fonts={fonts} />}
      <Footer data={footerData} colors={colors} fonts={fonts} />
      <Modal data={modalData} colors={colors} fonts={fonts} />
    </div>
  );
};


export default WeddingRusticTemplate;

