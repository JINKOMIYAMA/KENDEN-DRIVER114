import { motion } from "framer-motion";

const risks = [
  { id: 1, title: "生産ロス", angle: 0 },
  { id: 2, title: "生産中断", angle: 60 },
  { id: 3, title: "生産精度", angle: 120 },
  { id: 4, title: "資金補填", angle: 180 },
  { id: 5, title: "賠償", angle: 240 },
  { id: 6, title: "医療費", angle: 300 },
];

const RiskDiagram = () => {
  return (
    <div className="relative w-80 h-80 mx-auto">
      <div className="absolute inset-0 rounded-full border-2 border-primary" />
      {risks.map((risk) => (
        <motion.div
          key={risk.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: risk.id * 0.2 }}
          className="absolute w-20 h-20 bg-primary rounded-full flex items-center justify-center text-dark font-bold"
          style={{
            transform: `rotate(${risk.angle}deg) translateX(120px) rotate(-${risk.angle}deg)`,
          }}
        >
          {risk.title}
        </motion.div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 bg-dark rounded-full border-2 border-primary flex items-center justify-center text-primary font-bold">
          リスク要因
        </div>
      </div>
    </div>
  );
};

export default RiskDiagram;