import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  titleColor?: string;
  buttonColor?: "yellow" | "blue";
}

const ProductCard = ({ 
  id,
  title, 
  description, 
  image,
  price,
  titleColor = "text-green-600",
  buttonColor = "yellow"
}: ProductCardProps) => {
  const { addToCart } = useCart();
  const buttonColorClass = buttonColor === "blue" 
    ? "bg-blue-400 hover:bg-blue-200" 
    : "bg-yellow-500 hover:bg-yellow-400";

  const handleAddToCart = () => {
    addToCart({
      id,
      name: title,
      price
    });
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden">
      <div className="relative aspect-[16/9] w-full">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover bg-white"
        />
      </div>
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-2 ${titleColor}`}>{title}</h3>
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-300 text-lg">{description}</p>
          <button 
            onClick={handleAddToCart}
            className={`${buttonColorClass} text-gray-800 px-6 py-2 rounded-full text-base font-bold transition-colors ml-4 whitespace-nowrap`}
          >
            カートに追加
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;