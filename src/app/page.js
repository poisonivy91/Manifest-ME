import AffirmationBox from "./components/AffirmationBox";
import AIJournal from "./components/AIJournal";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-300 via-blue-200 to-indigo-400 animate-gradient-x flex items-center justify-center p-6">

      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-6">
          🌟 Manifest Me 🌟
        </h1>
    <AffirmationBox />
        <AIJournal />
        <p className="mt-4 text-lg text-white/80">
          Your journey to self-discovery and manifestation starts here. ✨
        </p>
      </div>
    </main>
  );
}
