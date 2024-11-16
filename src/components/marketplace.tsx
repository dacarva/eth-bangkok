import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Water (1L)",
    price: 1.5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Toilet Paper (4 rolls)",
    price: 3.0,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Rice (1kg)",
    price: 2.5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Beans (500g)",
    price: 1.8,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Hand Soap",
    price: 1.2,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "Toothpaste",
    price: 2.0,
    image: "/placeholder.svg?height=100&width=100",
  },
];

export default function Component() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Essential Items Marketplace
      </h1>
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search products..."
          className="max-w-sm mx-auto"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-contain mb-4"
              />
              <p className="text-2xl font-semibold">
                ${product.price.toFixed(2)}
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
