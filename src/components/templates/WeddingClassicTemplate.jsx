// Plantilla Boda Clásica - Simplificada
export default function WeddingClassicTemplate({ event, ui, setEvent }) {
  const COLORS = { primary: "#871C2B", secondary: "#EFEAE6", accent: "#D4AF37" };
  return <div>Boda Clásica - {event?.couple?.bride || "Victoria"} & {event?.couple?.groom || "Eduardo"}</div>;
}
