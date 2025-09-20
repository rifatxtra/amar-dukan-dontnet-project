import React from "react";
import { motion } from "framer-motion";

export default function About() {
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };
  return (
    <div className="w-[90%] md:w-[80%] my-5 flex flex-col mx-auto items-center justify-center gap-4">
            
            {/* OUR STORY */}
            <motion.div 
                className="w-full flex flex-col md:flex-row gap-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
            >
                <div className="w-full md:w-1/2">
                    <motion.img
                        src="/images/web/about1.jpg"
                        alt="error"
                        className="w-full h-[200px] md:h-[350px] rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <div className="w-full text-center md:w-1/2">
                    <p className="text-[20px] md:text-[25px] font-bold">OUR STORY</p>
                    <p className="text-[18px] md:text-[20px]">
                        Our journey started small, but our vision has always
                        been big to share our award-winning creations with
                        dessert lovers all over the world. Made with love,
                        dedication, and passion, our desserts will create
                        heavenly moments for all who visit.
                    </p>
                    <p className="text-[18px] md:text-[20px]">
                        We’ve been delighting customers with our delicious
                        desserts, so come to Amar Dokan today and enjoy!
                    </p>
                </div>
            </motion.div>

            {/* OUR SPOT */}
            <motion.div 
                className="w-full flex flex-col md:flex-row gap-3 mt-7"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
            >
                <div className="w-full text-center md:w-1/2">
                    <p className="text-[20px] md:text-[25px] font-bold">OUR SPOT</p>
                    <p className="text-[18px] md:text-[20px]">
                        Every <b>Amar Dokan</b> location is designed to reflect
                        the contemporary charm of the cities we’re proud to be a
                        part of. Our restaurants are more than just places to
                        enjoy dessert—they’re immersive spaces where style,
                        comfort, and indulgence come together. With modern,
                        urban-inspired interiors, cozy seating, and a vibrant
                        atmosphere, each of our restaurants offers the perfect
                        setting for catching up with friends, celebrating
                        milestones, or simply unwinding after a long day.
                    </p>
                </div>
                <div className="w-full md:w-1/2">
                    <motion.img
                        src="/images/web/hero.jpg"
                        alt="error"
                        className="w-full h-[200px] md:h-[350px] rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </motion.div>

            {/* OUR RECIPES */}
            <motion.div 
                className="w-full flex flex-col md:flex-row gap-3 mt-7"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
            >
                <div className="w-full md:w-1/2">
                    <motion.img
                        src="/images/web/about3.jpg"
                        alt="error"
                        className="w-full h-[200px] md:h-[350px] rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <div className="w-full text-center md:w-1/2">
                    <p className="text-[20px] md:text-[25px] font-bold">OUR RECIPIES</p>
                    <p className="text-[18px] md:text-[20px]">
                        Our journey started small, but our vision has always
                        been big – to share our award-winning creations with
                        dessert lovers all over the world. Made with love,
                        dedication, and passion, our desserts will create
                        heavenly moments for all who visit. Our recipes are
                        always fresh, crafted with care to hit the perfect sweet
                        spot of flavor and quality. Whether you’re craving
                        something savory or indulgently sweet, every dish is
                        made to satisfy and delight. Taste the difference that
                        freshness and balance bring to every bite.
                    </p>
                </div>
            </motion.div>

        </div>
  )
}
