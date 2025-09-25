// Plantilla Boda Rústica - Simplificada  
export default function WeddingRusticTemplate({ event, ui, setEvent }) {
  const COLORS = { primary: "#5A6C48", secondary: "#E0C9C9", accent: "#8B7355" };
  return <div>Boda Rústica - {event?.couple?.bride || "Camila"} & {event?.couple?.groom || "Tomás"}</div>;
}
