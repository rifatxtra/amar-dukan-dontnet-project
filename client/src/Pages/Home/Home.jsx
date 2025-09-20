import React from "react";
import { motion } from "framer-motion";


const words = ["Love","Care"];

export default function Home() {
  return (
    <div className="w-full bg-white flex flex-col items-center justify-center py-3">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="rounded-lg w-[90%] md:w-[80%] h-auto md:h-[500px] relative flex flex-col items-center justify-center text-center p-6 overflow-hidden z-0"
        style={{
          backgroundImage: `url('/images/web/hero.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
         <div class="absolute inset-0 bg-black/50"></div>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative z-10 text-white flex flex-col items-center justify-center"
        >
          <h3 className="md:text-[43px] font-semibold flex gap-2 relative">
            <span>Welcome to</span>
            <span className="relative block">
              Amar Dokan
              <svg
                className="w-full h-6 mt-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 500 150"
                preserveAspectRatio="none"
                fill="none"
                stroke="#F6B8BD"
                strokeWidth="4"
              >
                <path d="M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2C380.1,129.6,181.2,130.6,70,139 c82.6-2.9,254.2-1,335.9,1.3c-56,1.4-137.2-0.3-197.1,9"></path>
              </svg>
            </span>
          </h3>

          <p className="mt-4 text-[18px] text-gray-200">
            Discover the best desserts made with creativity and pure love…
          </p>

          <motion.a
            href="/order"
            rel="noopener noreferrer"
            className="mt-6 inline-block bg-[#F6B8BD] text-black font-semibold py-2 px-6 rounded shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Order Now
          </motion.a>
        </motion.div>
      </motion.div>

      {/* About Section */}
      <div className="w-full lg:w-[80%] mx-auto flex flex-col lg:flex-row py-6 gap-8 items-center">
        <motion.div
          className="w-full flex justify-center lg:w-1/2"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="/images/web/hero2.jpg"
            alt="Amar Dokan"
            loading="lazy"
            height={683}
            className="w-[90%] md:w-[80%] lg:w-full h-auto rounded-md object-cover"
          />
        </motion.div>

        <motion.div
          className="flex flex-col justify-center items-center w-[90%] lg:w-1/2 space-y-6"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-black flex flex-wrap items-center justify-center text-center">
            <span>A story of&nbsp;</span>
            {words.map((word, index) => (
              <React.Fragment key={word}>
                <motion.span
                  className="text-black font-extrabold"
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 4,
                    delay: index * 2,
                  }}
                  style={{
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    marginRight: "0.5rem",
                  }}
                >
                  {word}
                </motion.span>
              </React.Fragment>
            ))}
          </h2>

          <p className="text-black text-lg text-center">
            Get to know the passion and the people behind Amar Dokan and our
            unique dessert creations
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="/about"
              className="bg-[#A17342] w-max text-white font-semibold py-2 px-6 rounded shadow"
            >
              About Us
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero section image with overlay */}
      <motion.div
        className="w-[90%] md:w-[80%] flex flex-col items-center justify-center h-[150px] md:h-[300px] relative rounded-md overflow-hidden"
        style={{
          backgroundImage: `url('/images/web/hero3.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>

        <div className="relative z-10 space-y-2 text-center p-10">
          <p className="md:text-[25px] text-white font-bold">
            Join us for the unforgettable dessert experience.
          </p>
          <p className="md:text-[25px] text-white font-bold">
            Order now for dine-in or collection!
          </p>
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        className="w-[90%] md:w-[80%] flex flex-col items-center justify-center py-5 text-black gap-3"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h1 className="text-[25px] font-bold">Get in Touch</h1>
        <p className="text-[20px] text-center">
          Connect us for any inquiries or to learn more about our offerings
        </p>
        <motion.button
          onClick={() => (window.location.href = "/contact-us")}
          className="p-2 px-4 w-max rounded-md text-white bg-[#A17342]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Now
        </motion.button>
      </motion.div>

      {/* Final image */}
      <motion.div
        className="flex justify-center w-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <img
          src="/images/web/hero4.jpg"
          alt="error"
          className="h-auto w-[90%] md:w-[80%] rounded-md"
        />
      </motion.div>
    </div>
  );
}
