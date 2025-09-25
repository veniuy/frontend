// Plantilla Boda Moderna - Simplificada
export default function WeddingModernTemplate({ event, ui, setEvent }) {
  // Colores modernos: azul petróleo y gris
  const COLORS = { primary: "#245D63", secondary: "#8F9AA7", accent: "#B8C5D1" };
  return <div>Boda Moderna - {event?.couple?.bride || "Sofia"} & {event?.couple?.groom || "Diego"}</div>;
}
