import React from 'react';
import styled from 'styled-components';

// Colores y fuentes
const primaryColor = '#6B8E23'; // Verde oliva
const secondaryColor = '#DEB887'; // Bronceado
const fontFamilyInter = 'Inter, sans-serif';
const fontFamilyPacifico = 'Pacifico, cursive';

// Componentes estilizados
const PageContainer = styled.div`
  font-family: ${fontFamilyInter};
  color: #333;
  background-color: #fff;
`;

const Section = styled.section`
  padding: 80px 0;
  text-align: center;
`;

const HeroSection = styled(Section)`
  background-color: ${primaryColor};
  color: #fff;
  padding: 150px 0;
  h1 {
    font-family: ${fontFamilyPacifico};
    font-size: 4em;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 1.5em;
    margin-bottom: 20px;
  }
  p {
    font-size: 1.2em;
  }
`;

const Title = styled.h2`
  font-family: ${fontFamilyPacifico};
  color: ${primaryColor};
  font-size: 3em;
  margin-bottom: 40px;
`;

const Subtitle = styled.h3`
  font-family: ${fontFamilyInter};
  color: #555;
  font-size: 1.8em;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: ${secondaryColor};
  color: #fff;
  border: none;
  padding: 15px 30px;
  font-size: 1.1em;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darken(${secondaryColor}, 10%);
  }
`;

const QuinceaneraModernTemplate = () => {
  return (
    <PageContainer>
      {/* Hero Section */}
      <HeroSection>
        <h1>[Nombre de la Quinceañera]</h1>
        <h2>MIS 15 AÑOS</h2>
        <p>¡Te espero para celebrar juntos este día tan especial!</p>
        <Button>Confirmar Asistencia</Button>
      </HeroSection>

      {/* Countdown Section */}
      <Section>
        <Title>¡Falta poco!</Title>
        <Subtitle>Cuenta regresiva para la gran celebración</Subtitle>
        {/* Aquí iría el componente de cuenta regresiva */}
        <p>[Días] días, [Horas] horas, [Minutos] minutos, [Segundos] segundos</p>
      </Section>

      {/* Celebración Section */}
      <Section>
        <Title>La Celebración</Title>
        <Subtitle>Detalles del evento</Subtitle>
        <p><strong>Fecha:</strong> [Fecha del evento]</p>
        <p><strong>Hora:</strong> [Hora del evento]</p>
        <p><strong>Lugar:</strong> [Nombre del lugar]</p>
        <p><strong>Dirección:</strong> [Dirección del lugar]</p>
        <Button>Ver en el mapa</Button>
      </Section>

      {/* Galería Section */}
      <Section>
        <Title>Mi Galería</Title>
        <Subtitle>Momentos especiales</Subtitle>
        {/* Aquí iría el componente de galería de imágenes */}
        <p>Imágenes de la quinceañera</p>
      </Section>

      {/* Regalos Section */}
      <Section>
        <Title>Lista de Regalos</Title>
        <Subtitle>Si deseas hacerme un regalo</Subtitle>
        <p>Tu presencia es mi mejor regalo, pero si deseas obsequiarme algo, aquí tienes algunas opciones:</p>
        <Button>Ver lista de regalos</Button>
      </Section>

      {/* Instagram Section */}
      <Section>
        <Title>Sígueme en Instagram</Title>
        <Subtitle>#Mis15Años</Subtitle>
        {/* Aquí iría el feed de Instagram */}
        <p>Conéctate conmigo en Instagram usando #Mis15Años</p>
      </Section>

      {/* RSVP Section */}
      <Section>
        <Title>Confirma tu Asistencia</Title>
        <Subtitle>¡No te lo pierdas!</Subtitle>
        <p>Por favor, confirma tu asistencia antes del [Fecha límite RSVP].</p>
        <Button>Confirmar Asistencia</Button>
      </Section>

      {/* Canciones Section */}
      <Section>
        <Title>Pide tu Canción</Title>
        <Subtitle>Ayúdame a crear la playlist perfecta</Subtitle>
        <p>¿Qué canción te gustaría escuchar en la fiesta?</p>
        <Button>Sugerir una canción</Button>
      </Section>

      {/* Información Útil Section */}
      <Section>
        <Title>Información Útil</Title>
        <Subtitle>Detalles adicionales para mis invitados</Subtitle>
        <p>Aquí encontrarás información sobre alojamiento, transporte y otros detalles importantes.</p>
        <Button>Ver más información</Button>
      </Section>

      {/* Footer */}
      <Section style={{ backgroundColor: '#333', color: '#fff', padding: '40px 0' }}>
        <p>&copy; {new Date().getFullYear()} [Nombre de la Quinceañera]. Todos los derechos reservados.</p>
      </Section>

      {/* Modales (ejemplo) */}
      {/* <Modal /> */}
    </PageContainer>
  );
};

export default QuinceaneraModernTemplate;
