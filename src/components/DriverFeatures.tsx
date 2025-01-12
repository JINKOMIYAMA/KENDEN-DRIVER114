import { motion } from "framer-motion";
import ElectricWorkBg from '../assets/images/Electric work.jpg';
import PlusDriver from '../assets/images/driver photo.jpg';
import { useState, useEffect } from 'react';

const textSizes = {
  small: {
    pc: {
      title: "text-2xl",
      description: "text-lg"
    },
    mobile: {
      title: "text-xl",
      description: "text-base"
    }
  },
  medium: {
    pc: {
      title: "text-3xl",
      description: "text-xl"
    },
    mobile: {
      title: "text-2xl",
      description: "text-lg"
    }
  },
  large: {
    pc: {
      title: "text-4xl",
      description: "text-2xl"
    },
    mobile: {
      title: "text-3xl",
      description: "text-xl"
    }
  }
};

const features = [
  {
    id: 1,
    title: "先端保護",
    description: "先端6mmまで金属部分をチューブで保護",
    pcPosition: "top-[150px] left-[-10px]",
    mobilePosition: "top-[0px] left-[0px]",
    pcSize: "max-w-[370px]",
    mobileSize: "max-w-[150px]",
    pcLine: { x1: "50%", y1: "100%", x2: "200%", y2: "200%" },
    mobileLine: { x1: "50%", y1: "100%", x2: "150%", y2: "150%" },
  },
  {
    id: 2,
    title: "テストボタン",
    description: "テストボタンで使用前点検が可能",
    pcPosition: "top-[40px] right-[245px]",
    mobilePosition: "top-[220px] right-[0px]",
    pcSize: "max-w-[305px]",
    mobileSize: "max-w-[130px]",
    pcLine: { x1: "50%", y1: "100%", x2: "-50%", y2: "200%" },
    mobileLine: { x1: "50%", y1: "100%", x2: "-50%", y2: "150%" },
  },
  {
    id: 3,
    title: "LEDインジケーター",
    description: "作業箇所の通電・無電が見える高精度LED",
    pcPosition: "bottom-[80px] left-[80px]",
    mobilePosition: "bottom-[200px] left-[0px]",
    pcSize: "max-w-sm",
    mobileSize: "max-w-[135px]",
    pcLine: { x1: "50%", y1: "0%", x2: "150%", y2: "-100%" },
    mobileLine: { x1: "50%", y1: "0%", x2: "150%", y2: "-100%" },
  },
  {
    id: 4,
    title: "滑り止めグリップ",
    description: "ゴム製の持ちやすい滑り止め",
    pcPosition: "bottom-[80px] right-[20px]",
    mobilePosition: "bottom-[-50px] right-[10px]",
    pcSize: "max-w-sm",
    mobileSize: "max-w-[180px]",
    pcLine: { x1: "50%", y1: "0%", x2: "-50%", y2: "-100%" },
    mobileLine: { x1: "50%", y1: "0%", x2: "-50%", y2: "-100%" },
  },
  {
    id: 5,
    title: "手袋着用可",
    description: "手袋を装着しながらできる",
    pcPosition: "top-[80px] right-[-10px]",
    mobilePosition: "top-[20px] right-[0px]",
    pcSize: "max-w-sm",
    mobileSize: "max-w-[150px]",
    pcLine: { x1: "50%", y1: "100%", x2: "-50%", y2: "150%" },
    mobileLine: { x1: "50%", y1: "100%", x2: "-50%", y2: "150%" },
  },
];

const DriverFeatures = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 余白調整用の設定値（ピクセル単位）
  const spacingAdjust = {
    pc: {
      top: 79,    // PC版上部の余白削減量
      bottom: 80  // PC版下部の余白削減量
    },
    mobile: {
      top: 70     // モバイル版上部の余白削減量
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section 
      className="relative"
      style={{
        paddingTop: windowWidth >= 768 
          ? `calc(5rem - ${spacingAdjust.pc.top}px)` 
          : `calc(5rem - ${spacingAdjust.mobile.top}px)`,
        paddingBottom: windowWidth >= 768 
          ? `calc(5rem - ${spacingAdjust.pc.bottom}px)` 
          : '5rem'
      }}
    >
      <div 
        className="absolute inset-0 z-0 before:absolute before:inset-0 before:bg-gradient-to-t before:from-dark before:to-transparent after:absolute after:inset-0 after:bg-gradient-to-b after:from-dark after:to-transparent"
        style={{
          backgroundImage: `url(${ElectricWorkBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.7) blur(4px)",
        }}
      />
      <div className="relative z-10 px-0">
        <div className="mb-16"></div>
        <div className="relative max-w-4xl mx-auto h-[600px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <img
              src={PlusDriver}
              alt="プラスドライバー"
              className={`
                w-auto 
                object-contain 
                ${windowWidth >= 768 
                  ? 'rotate-[0deg]' 
                  : 'rotate-[90deg] scale-[1.25]'
                }
              `}
            />
          </motion.div>

          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`
                absolute 
                z-30 
                ${windowWidth >= 768 ? feature.pcPosition : feature.mobilePosition}
                ${windowWidth >= 768 ? feature.pcSize : feature.mobileSize}
              `}
            >
              <div className="relative">
                {/* 上部の特徴（id: 1, 2）用のSVG */}
                {feature.id <= 2 && (
                  <svg
                    className="absolute inset-0 text-blue-400"
                    width="100%"
                    height="200"
                    style={{
                      top: '100%',
                      pointerEvents: 'none'
                    }}
                  >
                    <line 
                      x1={feature.pcLine.x1}
                      y1={feature.pcLine.y1}
                      x2={feature.pcLine.x2}
                      y2={feature.pcLine.y2}
                      stroke="currentColor" 
                      strokeWidth="2"
                      className="md:block hidden"
                    />
                    <line 
                      x1={feature.mobileLine.x1}
                      y1={feature.mobileLine.y1}
                      x2={feature.mobileLine.x2}
                      y2={feature.mobileLine.y2}
                      stroke="currentColor" 
                      strokeWidth="2"
                      className="md:hidden block"
                    />
                  </svg>
                )}

                {/* 下部の特（id: 3, 4）用のSVG */}
                {feature.id > 2 && (
                  <svg
                    className="absolute inset-0 text-blue-400"
                    width="100%"
                    height="200"
                    style={{
                      transform: 'translateY(-100%)',
                      pointerEvents: 'none'
                    }}
                  >
                    <line 
                      x1={feature.pcLine.x1}
                      y1={feature.pcLine.y1}
                      x2={feature.pcLine.x2}
                      y2={feature.pcLine.y2}
                      stroke="currentColor" 
                      strokeWidth="2"
                      className="md:block hidden"
                    />
                    <line 
                      x1={feature.mobileLine.x1}
                      y1={feature.mobileLine.y1}
                      x2={feature.mobileLine.x2}
                      y2={feature.mobileLine.y2}
                      stroke="currentColor" 
                      strokeWidth="2"
                      className="md:hidden block"
                    />
                  </svg>
                )}

                <div className="bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg border border-blue-600/20">
                  <h4 className="font-bold mb-2 text-[18px] md:text-[20px] text-blue-400">
                    {feature.id === 2 ? (
                      <>
                        テスト<br className="block md:hidden" />ボタン
                      </>
                    ) : (
                      feature.title
                    )}
                  </h4>
                  <p className="text-[15px] md:text-[18px] text-gray-200">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DriverFeatures;