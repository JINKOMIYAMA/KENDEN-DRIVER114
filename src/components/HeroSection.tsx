import { motion } from "framer-motion";
import heroImage from '../assets/images/HeroSection.jpg';

interface HeroSectionProps {
  onLearnMoreClick: () => void;
  onBuyClick: () => void;
}

const HeroSection = ({ onLearnMoreClick, onBuyClick }: HeroSectionProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white">
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(1.2)"
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight flex flex-col gap-4">
            <div className="text-yellow-500">電気が見える</div>
            <div>
              <span className="text-green-700">見電</span>
              <span className="text-gray-800">ドライバー</span>
            </div>
          </h1>
          <h2 className="text-2xl md:text-4xl mb-8 text-gray-600 font-medium tracking-wide">
            Safety Electric Driver
          </h2>
          <div className="text-lg md:text-2xl mb-12 max-w-3xl mx-auto text-gray-500 leading-relaxed">
            <p>検電器と作業用ドライバーが1つになった</p>
            <p>革新的なツール</p>
            <p className="mt-4">電気が見えるをコンセプトに開発</p>
          </div>
          <div className="flex flex-col gap-6 justify-center items-center">
            <button 
              onClick={onLearnMoreClick}
              className="bg-green-700 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-green-600 transition-all duration-300 w-56 hover:scale-105 transform shadow-lg"
            >
              詳細を見る
            </button>
            <button 
              onClick={onBuyClick}
              className="bg-yellow-500 text-gray-800 px-10 py-4 rounded-full text-lg font-bold hover:bg-yellow-400 transition-all duration-300 w-56 hover:scale-105 transform shadow-lg"
            >
              ご購入はこちら
            </button>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default HeroSection;