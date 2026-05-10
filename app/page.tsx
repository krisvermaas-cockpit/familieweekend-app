"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X, Gamepad2 } from "lucide-react";

type ActivityType = "eten" | "spel" | "activiteit" | "voetbal" | "overig";

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
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
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

        <button
          onClick={onClose}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors"
        >
          Begrepen!
        </button>
      </div>
    </div>
  );
}

function ActivityCard({
  activity,
  onKahoot,
}: {
  activity: Activity;
  onKahoot: () => void;
}) {
  const colorClass = typeColors[activity.type];
  const isHighlight = activity.highlight;

  return (
    <div
      className={`
        rounded-xl border p-3 mb-2 transition-all
        ${colorClass}
        ${isHighlight ? "border-l-4 border-r-2 border-t-2 border-l-red-400 border-r-red-400 border-t-red-400" : ""}
      `}
    >
      <div className="flex items-start gap-3">
        <div className="text-xl flex-shrink-0 mt-0.5">{activity.emoji}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {isHighlight && (
              <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                HOOGTEPUNT
              </span>
            )}
            <span className="text-xs text-gray-500 font-medium">
              {activity.time}
            </span>
          </div>
          <p className="font-semibold text-gray-800 text-sm mt-0.5">
            {activity.title}
          </p>
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

function DaySection({
  day,
  defaultOpen,
  onKahoot,
}: {
  day: Day;
  defaultOpen: boolean;
  onKahoot: () => void;
}) {
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
        <div
          className={`transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
        >
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

export default function Home() {
  const [showKahoot, setShowKahoot] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {showKahoot && <KahootModal onClose={() => setShowKahoot(false)} />}

      <header className="bg-gradient-to-r from-purple-600 to-purple-800 text-white text-center py-8 px-4 shadow-lg">
        <h1 className="text-3xl font-bold mb-1">🏕️ Familieweekend</h1>
        <p className="text-purple-200 text-base">
          Vorstenbosch | 19-21 juni 2026
        </p>
        <p className="text-purple-300 text-sm mt-1">
          FarmCamps Alpaca Vorstenbosch
        </p>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {days.map((day, i) => (
          <DaySection
            key={i}
            day={day}
            defaultOpen={day.day === "Zaterdag"}
            onKahoot={() => setShowKahoot(true)}
          />
        ))}

        <div className="text-center text-gray-400 text-xs mt-6 pb-4">
          🦙 Veel plezier samen!
        </div>
      </main>
    </div>
  );
}
