import { motion } from "framer-motion";
import { PartnerSlider } from "./PartnerSlider";

export function PartnersSection() {
  const platinumPartners = [
    {
      name: "Suhant University",
      logo: "./su.png",
    },
    {
      name: "Sunstone",
      logo: "./sunstone.png",
    },
    {
      name: "SET",
      logo: "./SET.png",
    },
    {
      name: "Samatrix.io",
      logo: "./Samatrix.png",
    },
    {
      name: "Education partner",
      logo: "./7.png",
    },
    {
      name: "Merelyn Studio",
      logo: "./Logos.png",
    },
    {
      name: "Smaaash",
      logo: "./Smaaash.png",
    },
    {
      name: "Huion",
      logo: "./Huion.png",
    },
    {
      name: "Scaninfoga",
      logo: "./saninfoga.png",
    }
  ];


  return (
    <section id="partners" className="py-20 relative overflow-hidden mt-4">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-cyan-900/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8 "
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
            Our Amazing{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
              Partners
            </span>
          </h2>
        </motion.div>

        <div className="space-y-16">
          <PartnerSlider 
            partners={platinumPartners} 
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
      
        </motion.div>
      </div>
    </section>
  );
}