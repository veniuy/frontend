// src/components/InvitationCanvas.jsx
import React, { useEffect, useState } from "react";
import { Heart, ChevronDown, Church, PartyPopper, MapPin, Users, Instagram, Facebook, Share2 } from "lucide-react";
import EditableText from "./EditableText";

export default function InvitationCanvas({ event, ui, setEvent }) {
  const [timeLeft, setTimeLeft] = useState({ days:0, hours:0, minutes:0, seconds:0 });
  useEffect(() => {
    const targetDate = new Date("2024-03-15T17:00:00");
    const timer = setInterval(() => {
      const now = Date.now();
      const distance = targetDate.getTime() - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / 86400000),
          hours: Math.floor((distance % 86400000) / 3600000),
          minutes: Math.floor((distance % 3600000) / 60000),
          seconds: Math.floor((distance % 60000) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const styles = {
    elegant: { background: "linear-gradient(135deg,#f5f7fa 0%,#c3cfe2 100%)", primaryColor: event.colors.primary, secondaryColor: event.colors.secondary, textColor: event.colors.text, fontFamily: event.fonts.primary },
    romantic:{ background:"linear-gradient(135deg,#ffecd2 0%,#fcb69f 100%)", primaryColor:"#e91e63", secondaryColor:"#ffc0cb", textColor:"#333", fontFamily:"Playfair Display" },
    modern:  { background:"linear-gradient(135deg,#667eea 0%,#764ba2 100%)", primaryColor:"#3498db", secondaryColor:"#2ecc71", textColor:"#fff", fontFamily:"Inter" },
    classic: { background:"linear-gradient(135deg,#f093fb 0%,#f5576c 100%)", primaryColor:"#8e44ad", secondaryColor:"#e74c3c", textColor:"#333", fontFamily:"Georgia" }
  };
  const currentStyle = styles[ui.selectedTemplate] || styles.elegant;

  const getCanvasStyle = () => {
    const baseWidth = ui.viewMode === "mobile" ? 375 : ui.viewMode === "tablet" ? 768 : 1200;
    const scaledWidth = (baseWidth * ui.zoom) / 100;
    return {
      width: `${scaledWidth}px`,
      minHeight: ui.viewMode === "mobile" ? "auto" : "100vh",
      transform: `scale(${ui.zoom / 100})`,
      transformOrigin: "top left",
      margin: ui.isMobile ? "0" : "0 auto"
    };
  };

  const TimeCell = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className={`font-light leading-none ${ui.isMobile ? "text-2xl":"text-4xl md:text-6xl"}`} style={{ color: event.colors.primary }}>
        {String(value).padStart(2,"0")}
      </div>
      <div className={`opacity-90 ${ui.isMobile ? "text-xs":"text-sm sm:text-base"}`} style={{ color: event.colors.text }}>
        {label}
      </div>
    </div>
  );

  return (
    <div className={`${ui.isMobile ? "p-2":"p-8"} flex justify-center`}>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="invitation-canvas"
          style={{ ...getCanvasStyle(), background: currentStyle.background, fontFamily: currentStyle.fontFamily, color: currentStyle.textColor, overflow: "hidden" }}>
          {/* —— aquí pegas el mismo JSX de la invitación original (Hero, Countdown, Detalles, RSVP, Footer)
               usando EditableText y setEvent exactamente como en tu archivo actual —— */}
        </div>
      </div>
    </div>
  );
}
