import React from "react";

const AboutKaren = () => {
  return (
    <section className="bg-white text-black py-20 px-4 sm:px-8 lg:px-16 text-center font-body">
      <h2 className="text-4xl md:text-5xl font-karen text-yellow-500 mb-6 uppercase">
        Who is Karen?
      </h2>
      <p className="max-w-3xl mx-auto text-lg md:text-xl mb-12">
        Karen is the loudest voice on the internet. She's bold, she's brave, and she always wants to speak to your Web3 manager. She's here to meme, to moon, and to make noise.
      </p>

      <div className="flex justify-center gap-8 flex-wrap">
        <img
          src="/assets/villain1.png"
          alt="Karen Villain 1"
          className="w-48 rounded-2xl shadow-lg hover:scale-110 transition-transform duration-300"
        />
        <img
          src="/assets/villain2.png"
          alt="Karen Villain 2"
          className="w-48 rounded-2xl shadow-lg hover:scale-110 transition-transform duration-300"
        />
        <img
          src="/assets/villain3.png"
          alt="Karen Villain 3"
          className="w-48 rounded-2xl shadow-lg hover:scale-110 transition-transform duration-300"
        />
      </div>
    </section>
  );
};

export default AboutKaren;