import React from 'react';

import Footer from './../../components/Footer/Footer.jsx';
function About() {
  return (
    <>
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 px-6 md:px-12 shadow-lg">
        <div className="container mx-auto">
          <h2 className="text-5xl font-extrabold text-center mb-8">About ChatZu</h2>
          <p className="text-lg leading-relaxed mb-6">
            Welcome to ChatZu, your ultimate chat application designed to bring people together. Whether you're looking to stay in touch with family, friends, or colleagues, ChatZu provides a seamless and enjoyable communication experience.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Our app is built with the latest technology to ensure fast and secure messaging. Enjoy features like real-time chat, media sharing, group conversations, and much more.
          </p>
          <p className="text-lg leading-relaxed">
            At ChatZu, we are committed to providing you with a platform that is not only functional but also user-friendly. Join us today and start connecting with the people who matter most to you.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default About;
