import { motion } from "framer-motion";
import { Calendar, MapPin, User } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Card } from "./ui/card";
interface Product {
  id: number;
  name: string;
  category: string;
  quantity: string;
  price: string;
  buyerCity: string;
  purchaseDate: string;
  farmerName: string;
  image: string;
}
interface ProductCardProps {
  product: Product;
}
export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <Badge className="absolute top-3 right-3 bg-white/90 text-black backdrop-blur-sm">
            {product.category}
          </Badge>
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
              <p className="text-2xl font-bold text-gray-900">{product.price}</p>
            </div>
            <Badge variant="secondary" className="text-sm">
              {product.quantity}
            </Badge>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{product.buyerCity}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(product.purchaseDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{product.farmerName}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};