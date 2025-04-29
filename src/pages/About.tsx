import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutKaren() {
  return (
    <div className="relative min-h-screen bg-[url('./assets/karen-bg-pattern.png')] bg-cover bg-center text-white">
      <Header />

      <main className="backdrop-blur-sm bg-black/60 min-h-screen px-6 md:px-12 py-12 flex flex-col items-center justify-center space-y-12">
        <h1 className="text-5xl md:text-6xl font-bold text-yellow-300 drop-shadow-xl text-center">
          What is Karen World?
        </h1>

        <div className="w-full max-w-4xl space-y-8">
          <section className="bg-white/10 p-6 md:p-8 rounded-2xl shadow-2xl space-y-4 border border-white/20">
            <h2 className="text-2xl font-bold text-pink-300">🌀 Our Philosophy</h2>
            <p>
              $KAREN was born from the righteous anger of a thousand unsatisfied customers.
              We believe every blockchain deserves a voice that says:
              <span className="font-bold text-yellow-300"> "Let me speak to your manager."</span>
            </p>
          </section>

          <section className="bg-white/10 p-6 md:p-8 rounded-2xl shadow-2xl space-y-4 border border-white/20">
            <h2 className="text-2xl font-bold text-red-400">🤬 The Origin</h2>
            <p>
              When DeFi forgot about user experience, and DAO leaders stopped listening,
              Karen stood up. Karen yelled. Karen launched her own token.
            </p>
            <p>
              Now, she’s not just yelling—she’s building.
            </p>
          </section>

          <section className="bg-white/10 p-6 md:p-8 rounded-2xl shadow-2xl space-y-4 border border-white/20">
            <h2 className="text-2xl font-bold text-green-300">🎯 Our Mission</h2>
            <p>
              Empower meme communities to raise their voice, challenge centralized nonsense,
              and laugh all the way to the moon.
            </p>
            <p className="italic text-pink-200">
              We don’t just go up—we complain all the way there.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}