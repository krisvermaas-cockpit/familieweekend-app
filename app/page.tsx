"use client";

import { useState } from "react";
import { ChevronDown, X, Gamepad2, Calendar, Info, Home as HomeIcon, MapPin, Phone, Globe, ExternalLink } from "lucide-react";

type ActivityType = "eten" | "spel" | "activiteit" | "voetbal" | "overig";
type Tab = "programma" | "info" | "praktisch";

interface Activity {
  time: string;
  emoji: string;
  title: string;
  location: string;
  type: ActivityType;
  highlight?: boolean;
  kahoot?: boolean;
}

interface Day {
  day: string;
  date: string;
  activities: Activity[];
}

const typeColors: Record<ActivityType, string> = {
  eten: "bg-yellow-50 border-yellow-200",
  spel: "bg-orange-50 border-orange-200",
  activiteit: "bg-blue-50 border-blue-200",
  voetbal: "bg-red-50 border-red-200",
  overig: "bg-gray-50 border-gray-200",
};

const days: Day[] = [
  {
    day: "Vrijdag",
    date: "19 juni",
    activities: [
      {
        time: "Vrij",
        emoji: "🍽️",
        title: "Individuele eetmomenten",
        location: "Je tent",
        type: "eten",
      },
      {
        time: "20:30 – 22:00",
        emoji: "🎲",
        title: "Gezamenlijke Spellenclub",
        location: "Alpacabar",
        type: "spel",
      },
    ],
  },
  {
    day: "Zaterdag",
    date: "20 juni",
    activities: [
      {
        time: "07:00 – 08:30",
        emoji: "🦙",
        title: "Alpaca voeren (optioneel) – Met boer Willem-Mathijs",
        location: "Boerderij",
        type: "activiteit",
      },
      {
        time: "09:00 – 10:30",
        emoji: "☀️",
        title: "Ochtend – Vrij programma",
        location: "Boerderij & omgeving",
        type: "overig",
      },
      {
        time: "10:30 – 12:00",
        emoji: "🚜",
        title: "BOERENGAMES",
        location: "Boerderij",
        type: "spel",
        highlight: true,
        kahoot: true,
      },
      {
        time: "12:00 – 13:30",
        emoji: "🍴",
        title: "Lunch & voorbereiding",
        location: "Boerderij",
        type: "eten",
      },
      {
        time: "13:15",
        emoji: "📍",
        title: "Verzameling",
        location: "Op het erf",
        type: "overig",
      },
      {
        time: "13:30 – 17:00",
        emoji: "🎯",
        title: "GEZAMENLIJKE ACTIVITEIT",
        location: "Omgeving",
        type: "activiteit",
        highlight: true,
      },
      {
        time: "17:30 – 19:00",
        emoji: "🔥",
        title: "BBQ & Eten",
        location: "Gezamenlijk terras",
        type: "eten",
      },
      {
        time: "19:00",
        emoji: "⚽",
        title: "Nederlands Elftal – WK",
        location: "Alpacabar of tent",
        type: "voetbal",
        highlight: true,
      },
      {
        time: "21:00 – 22:30",
        emoji: "🎭",
        title: "Bonte Avond",
        location: "Gezamenlijk terras",
        type: "activiteit",
        highlight: true,
      },
    ],
  },
  {
    day: "Zondag",
    date: "21 juni",
    activities: [
      {
        time: "08:00 – 09:00",
        emoji: "🌅",
        title: "Gezamenlijk ontbijt",
        location: "Te bepalen",
        type: "eten",
      },
      {
        time: "09:00 – 11:00",
        emoji: "👋",
        title: "Opruimen & Vertrek",
        location: "Erf & tenten",
        type: "overig",
      },
      {
        time: "11:00 – 12:00",
        emoji: "☕",
        title: "Gezamenlijke koffie",
        location: "Gezamenlijk",
        type: "overig",
      },
      {
        time: "12:00 – 13:00",
        emoji: "🍽️",
        title: "Gezamenlijke lunch",
        location: "Gezamenlijk",
        type: "eten",
      },
      {
        time: "14:00",
        emoji: "👋",
        title: "Iedereen naar huis",
        location: "Vertrek",
        type: "overig",
      },
    ],
  },
];

function KahootModal({ onClose }: { onClose: () => void }) {
  const [pin, setPin] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Gamepad2 className="text-orange-500" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Kahoot!</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={22} />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Voer de 7-cijferige PIN in om mee te doen met de Boerengames quiz:
        </p>
        <input
          type="number"
          placeholder="PIN invoeren..."
          value={pin}
          onChange={(e) => setPin(e.target.value.slice(0, 7))}
          className="w-full border-2 border-orange-300 rounded-xl px-4 py-3 text-center text-2xl font-bold tracking-widest focus:outline-none focus:border-orange-500 mb-4"
        />
        <ol className="text-xs text-gray-500 space-y-1 mb-5 list-decimal list-inside">
          <li>Ga naar <strong>kahoot.it</strong> op je telefoon</li>
          <li>Voer de PIN in die je ziet op het scherm</li>
          <li>Kies je naam en wacht op de start</li>
        </ol>
        <button onClick={onClose} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors">
          Begrepen!
        </button>
      </div>
    </div>
  );
}

function ActivityCard({ activity, onKahoot }: { activity: Activity; onKahoot: () => void }) {
  const colorClass = typeColors[activity.type];
  const isHighlight = activity.highlight;

  return (
    <div className={`rounded-xl border p-3 mb-2 transition-all ${colorClass} ${isHighlight ? "border-l-4 border-r-2 border-t-2 border-l-red-400 border-r-red-400 border-t-red-400" : ""}`}>
      <div className="flex items-start gap-3">
        <div className="text-xl flex-shrink-0 mt-0.5">{activity.emoji}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {isHighlight && (
              <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                HOOGTEPUNT
              </span>
            )}
            <span className="text-xs text-gray-500 font-medium">{activity.time}</span>
          </div>
          <p className="font-semibold text-gray-800 text-sm mt-0.5">{activity.title}</p>
          <p className="text-xs text-gray-500 mt-0.5">📍 {activity.location}</p>
        </div>
        {activity.kahoot && (
          <button
            onClick={onKahoot}
            className="flex-shrink-0 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
          >
            <Gamepad2 size={14} />
            Kahoot!
          </button>
        )}
      </div>
    </div>
  );
}

function DaySection({ day, defaultOpen, onKahoot }: { day: Day; defaultOpen: boolean; onKahoot: () => void }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-4 rounded-2xl overflow-hidden shadow-md">
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white px-5 py-4 flex items-center justify-between hover:from-purple-700 hover:to-purple-900 transition-all"
      >
        <div className="text-left">
          <div className="font-bold text-lg">{day.day}</div>
          <div className="text-purple-200 text-sm">{day.date}</div>
        </div>
        <div className={`transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}>
          <ChevronDown size={22} />
        </div>
      </button>
      {open && (
        <div className="bg-white px-4 pt-3 pb-2">
          {day.activities.map((activity, i) => (
            <ActivityCard key={i} activity={activity} onKahoot={onKahoot} />
          ))}
        </div>
      )}
    </div>
  );
}

function InfoTab() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-md p-5">
        <h2 className="font-bold text-gray-800 text-base mb-4 flex items-center gap-2">
          <MapPin size={18} className="text-purple-600" />
          Locatie
        </h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700">Adres</p>
              <p className="text-sm text-gray-600">Leeghandseweg 10</p>
              <p className="text-sm text-gray-600">5476 VD Vorstenbosch</p>
              <a
                href="https://maps.google.com/?q=Leeghandseweg+10,+5476+VD+Vorstenbosch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-purple-600 font-medium mt-1 hover:text-purple-800"
              >
                Open in Maps <ExternalLink size={11} />
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700">Telefoon</p>
              <a href="tel:0888889188" className="text-sm text-purple-600 hover:text-purple-800">
                088-8889188
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Globe size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-700">Website</p>
              <a
                href="https://alpacavorstenbosch.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800"
              >
                alpacavorstenbosch.nl <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-5">
        <h2 className="font-bold text-gray-800 text-base mb-4">🦙 Dieren op de boerderij</h2>
        <div className="grid grid-cols-2 gap-2">
          {["🦙 Alpaca's", "🐱 Katten", "🐔 Kippen", "🐇 Konijnen"].map((dier) => (
            <div key={dier} className="bg-purple-50 rounded-xl px-3 py-2 text-sm text-gray-700 font-medium">
              {dier}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-5">
        <h2 className="font-bold text-gray-800 text-base mb-3">🍺 Openingstijden Alpacabar</h2>
        <div className="space-y-1">
          {["Vrijdag", "Zaterdag", "Zondag"].map((dag) => (
            <div key={dag} className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{dag}</span>
              <span className="font-medium text-gray-800">Open</span>
            </div>
          ))}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Vakantieperiodes</span>
            <span className="font-medium text-gray-800">Open</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PraktischTab() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-md p-5">
        <h2 className="font-bold text-gray-800 text-base mb-4">✅ Inbegrepen bij verblijf</h2>
        <div className="space-y-2">
          {[
            { emoji: "🦙", label: "Alpaca Beleving" },
            { emoji: "🤝", label: "Meet & Greet met alpaca's" },
            { emoji: "🌾", label: "Alpaca voeren" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
              <span className="text-lg">{item.emoji}</span>
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <span className="ml-auto text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">INBEGREPEN</span>
            </div>
          ))}
          {["Workshops", "Picknick", "Pizza's"].map((item) => (
            <div key={item} className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
              <span className="text-sm font-medium text-gray-700">{item}</span>
              <span className="ml-auto text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">INBEGREPEN</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-5">
        <h2 className="font-bold text-gray-800 text-base mb-4">💳 Te huren</h2>
        <div className="space-y-2">
          {["🏖️ Handdoekenpakket", "👨‍🌾 Boerenoveralls"].map((item) => (
            <div key={item} className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2">
              <span className="text-sm font-medium text-gray-700">{item}</span>
              <span className="ml-auto text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">HUUR</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-5">
        <h2 className="font-bold text-gray-800 text-base mb-4">🎮 Speelplekken voor kids</h2>
        <div className="grid grid-cols-3 gap-2">
          {[
            { emoji: "🛵", label: "Skelters" },
            { emoji: "🤸", label: "Trampoline" },
            { emoji: "🍳", label: "Modderkeuken" },
          ].map((item) => (
            <div key={item.label} className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-center">
              <div className="text-2xl mb-1">{item.emoji}</div>
              <div className="text-xs font-medium text-gray-700">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-5">
        <h2 className="font-bold text-gray-800 text-base mb-4">🌳 Omgeving</h2>
        <div className="space-y-2">
          {[
            { emoji: "⛰️", label: "Bedafse Bergen" },
            { emoji: "🚣", label: "Fluisterboten rivier de Aa" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
              <span className="text-xl">{item.emoji}</span>
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [showKahoot, setShowKahoot] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("programma");

  const tabs: { id: Tab; icon: React.ReactNode; label: string }[] = [
    { id: "programma", icon: <Calendar size={16} />, label: "Programma" },
    { id: "info", icon: <Info size={16} />, label: "Info" },
    { id: "praktisch", icon: <HomeIcon size={16} />, label: "Praktisch" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {showKahoot && <KahootModal onClose={() => setShowKahoot(false)} />}

      <header className="bg-gradient-to-r from-purple-600 to-purple-800 text-white text-center py-8 px-4 shadow-lg">
        <h1 className="text-3xl font-bold mb-1">🏕️ Familieweekend</h1>
        <p className="text-purple-200 text-base">Vorstenbosch | 19-21 juni 2026</p>
        <p className="text-purple-300 text-sm mt-1">FarmCamps Alpaca Vorstenbosch</p>
      </header>

      {/* Tab buttons */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 py-6">
        {activeTab === "programma" && (
          <>
            {days.map((day, i) => (
              <DaySection
                key={i}
                day={day}
                defaultOpen={day.day === "Zaterdag"}
                onKahoot={() => setShowKahoot(true)}
              />
            ))}
          </>
        )}
        {activeTab === "info" && <InfoTab />}
        {activeTab === "praktisch" && <PraktischTab />}

        <div className="text-center text-gray-400 text-xs mt-6 pb-4">
          🦙 Veel plezier samen!
        </div>
      </main>
    </div>
  );
}
