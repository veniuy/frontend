// src/pages/VisualEditorPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditorPanel from "../components/EditorPanel";
import InvitationCanvas from "../components/InvitationCanvas";
import TemplateRenderer from "../components/TemplateRenderer";


export default function VisualEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    id: id || "1",
    couple: { bride: "María", groom: "Juan" },
    date: "15 de Marzo, 2024",
    time: "17:00",
    ceremony: { venue: "Iglesia San Miguel", address: "Calle Mayor 123, Madrid", time: "17:00" },
    reception: { venue: "Jardín Botánico", address: "Av. Libertador 456, Madrid", time: "19:30" },
    description: "¡NOS CASAMOS!",
    hashtag: "#MariaYJuan2024",
    template: "elegant",
    colors: { primary: "#e91e63", secondary: "#ffc0cb", background: "#ffffff", text: "#333333", accent: "#8e44ad" },
    fonts: { primary: "Playfair Display", secondary: "Inter" }
  });

  const [ui, setUi] = useState({
    activeTab: "design",
    zoom: 100,
    selectedTemplate: "elegant",
    showMobilePanel: false,
    viewMode: "desktop",
    isMobile: false,
    saving: false,
    error: null
  });

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setUi((u) => ({ ...u, isMobile: mobile, viewMode: mobile ? "mobile" : u.viewMode, zoom: mobile ? 80 : u.zoom }));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handlers que pasan al Panel
  const handleColorChange = (property, color) =>
    setEvent((prev) => ({ ...prev, colors: { ...prev.colors, [property]: color } }));

  const handleFontChange = (type, fontFamily) =>
    setEvent((prev) => ({ ...prev, fonts: { ...prev.fonts, [type]: fontFamily } }));

  const handleTemplateChange = (templateId) => {
    setUi((u) => ({ ...u, selectedTemplate: templateId }));
    setEvent((prev) => ({ ...prev, template: templateId }));
  };

  const setActiveTab = (t) => setUi((u) => ({ ...u, activeTab: t }));
  const setShowMobilePanel = (v) => setUi((u) => ({ ...u, showMobilePanel: v }));
  const setViewMode = (v) => setUi((u) => ({ ...u, viewMode: v }));
  const setZoom = (fn) => setUi((u) => ({ ...u, zoom: typeof fn === "function" ? fn(u.zoom) : fn }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Encabezado y controles rápidos… (puedes conservar los del archivo original) */}
      <div className="flex h-[calc(100vh-80px)]">
        <EditorPanel
          event={event}
          ui={ui}
          setActiveTab={setActiveTab}
          setShowMobilePanel={setShowMobilePanel}
          handleColorChange={handleColorChange}
          handleFontChange={handleFontChange}
          handleTemplateChange={handleTemplateChange}
          setEvent={setEvent}
        />
        <div className="flex-1 overflow-auto bg-gray-100">
          <InvitationCanvas
            event={event}
            ui={ui}
            setEvent={setEvent}
            setZoom={setZoom}
          />
        </div>
      </div>
    </div>
  );
}

