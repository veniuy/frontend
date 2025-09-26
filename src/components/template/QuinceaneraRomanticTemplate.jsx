import React, { Component } from 'react';
import './QuinceaneraRomanticTemplate.css';

// Importing children components
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Countdown from './components/Countdown/Countdown';
import Celebration from './components/Celebration/Celebration';
import Gallery from './components/Gallery/Gallery';
import Gifts from './components/Gifts/Gifts';
import Instagram from './components/Instagram/Instagram';
import RSVPform from './components/RSVPform/RSVPform';
import Songs from './components/Songs/Songs';
import UsefulInfo from './components/UsefulInfo/UsefulInfo';
import Footer from './components/Footer/Footer';

class QuinceaneraRomanticTemplate extends Component {
  render() {
    return (
      <div className="quinceanera-romantic-template">
        <Navbar />
        <Hero />
        <Countdown />
        <Celebration />
        <Gallery />
        <Gifts />
        <Instagram />
        <RSVPform />
        <Songs />
        <UsefulInfo />
        <Footer />
      </div>
    );
  }
}

export default QuinceaneraRomanticTemplate;

