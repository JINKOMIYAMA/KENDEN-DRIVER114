import { FC } from 'react';
import shoeiLogo from '../assets/images/shoeilogo.jpg';

const CompanySection: FC = () => {
  return (
    <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#0A192F' }}>
      <div className="container mx-auto px-4">
        <div className="fade-in-section">
          <h2 className="section-title !text-green-600">Company</h2>
          <h3 className="section-subtitle !text-white">会社概要</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-xl border shadow-xl">
                <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={shoeiLogo}
                      alt="昭栄電気株式会社"
                      className="w-16 h-16 object-contain"
                    />
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">株式会社昭栄電気産業</h4>
                      <p className="text-lg text-gray-600">Shoei Electrical Industries Co., Ltd.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-3 md:gap-6">
                    <span className="text-xl md:text-xl text-black font-bold whitespace-nowrap">販売元</span>
                    <span className="text-lg md:text-lg text-gray-700 whitespace-nowrap scale-100 origin-left">株式会社昭栄電気産業</span>
                  </div>
                  <div className="flex flex-col md:flex-row gap-3 md:gap-6">
                    <span className="text-xl md:text-xl text-black font-bold whitespace-nowrap">所在地</span>
                    <span className="text-lg md:text-lg text-gray-700 whitespace-nowrap scale-100 origin-left">〒125-0053 東京都葛飾区鎌倉3-58-2</span>
                  </div>
                  <div className="flex flex-col md:flex-row gap-3 md:gap-6">
                    <span className="text-xl md:text-xl text-black font-bold whitespace-nowrap">お問い合わせ</span>
                    <span className="text-lg md:text-lg text-gray-700 whitespace-nowrap scale-100 origin-left">shoei-buppan@shoeinet.com</span>
                  </div>
                  <div className="flex flex-col md:flex-row gap-3 md:gap-6">
                    <span className="text-xl md:text-xl text-black font-bold whitespace-nowrap">製造元</span>
                    <span className="text-lg md:text-lg text-gray-700 whitespace-nowrap scale-100 origin-left">株式会社ベッセル</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-[400px] rounded-xl overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
                alt="会社外観"
                className="object-cover w-full h-full brightness-120 transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-700 group-hover:opacity-40" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-lg md:text-xl text-white font-medium">
                  電気工事の安全と効率性を追求し革新的なツールを開発
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanySection;