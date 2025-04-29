import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const heroImage = "/assets/karen-hero.png";
const villain1 = "/assets/villain1.png";
const villain2 = "/assets/villain2.png";
const joinImage = "/assets/join.png";

const Home = () => {
  return (
    <div className="bg-[url('./assets/karen-bg-pattern.png')] bg-cover bg-center min-h-screen text-white font-karen">
      <Header />

      <main className="pt-28 space-y-24">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-6">
          <img src={heroImage} alt="Karen Hero" className="w-32 sm:w-40 h-auto mb-6 drop-shadow-lg" />
          <h1 className="text-4xl sm:text-6xl font-karen tracking-wider uppercase mb-4 text-yellow-300">
            Join the Rebellion
          </h1>
          <Link
            to="/airdrop"
            className="bg-yellow-400 text-black font-karen text-lg sm:text-xl px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:bg-yellow-300 transition"
          >
            Airdrop Now
          </Link>
        </section>

        {/* Who is Karen */}
        <section className="bg-black/60 backdrop-blur-xl px-6 py-12 rounded-2xl max-w-4xl mx-auto text-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-karen text-yellow-300 mb-4">Who is Karen?</h2>
          <p className="text-base sm:text-lg font-body text-white/90 mb-8">
            Karen is a bold voice that stands out in everyday chaos. Now, she's here to prove her power in Web3.
          </p>
          <div className="flex justify-center gap-4 sm:gap-6 flex-wrap">
            <img src={villain1} alt="Karen Villain 1" className="w-44 sm:w-52 rounded-xl shadow-xl" />
            <img src={villain2} alt="Karen Villain 2" className="w-44 sm:w-52 rounded-xl shadow-xl" />
          </div>
        </section>

        {/* Meme Philosophy */}
        <section className="bg-black/70 px-6 py-12 rounded-2xl max-w-3xl mx-auto text-center shadow-xl backdrop-blur-xl">
          <h2 className="text-3xl sm:text-4xl font-karen text-yellow-300 mb-3">Meme Philosophy</h2>
          <p className="text-lg sm:text-xl font-body text-white/80">
            “It takes courage from villains to change the world.”
          </p>
        </section>

        {/* Join Us */}
        <section className="bg-black/60 backdrop-blur-xl px-6 py-12 rounded-2xl max-w-3xl mx-auto text-center shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-karen text-yellow-300 mb-2">Join the Community</h2>
          <p className="text-sm sm:text-base font-body mb-6 text-white/80">
            Connect with Karens on Discord and Twitter!
          </p>
          <img
            src={joinImage}
            alt="Join us"
            className="mx-auto w-56 sm:w-64 mb-4 drop-shadow"
          />
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://twitter.com/KarenW_Official"
              className="bg-white text-black px-4 py-2 rounded-full font-karen hover:bg-gray-200 transition"
            >
              Twitter
            </a>
            <a
              href="https://discord.gg/RujYeEK9"
              className="bg-white text-black px-4 py-2 rounded-full font-karen hover:bg-gray-200 transition"
            >
              Discord
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
