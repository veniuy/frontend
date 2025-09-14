import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiClient } from '../lib/api';
import WeddingInvitationEditor from '../components/WeddingInvitationEditor';

const InvitationEditor = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await apiClient.getEvent(id);
        setEvent(response.event);
      } catch (err) {
        setError('Error al cargar el evento');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  if (loading) {
    return <div>Cargando editor...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!event) {
    return <div>Evento no encontrado.</div>;
  }

  return <WeddingInvitationEditor event={event} />;
};

export default InvitationEditor;
