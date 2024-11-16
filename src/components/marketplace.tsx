"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Water (1L)",
    price: 1.5,
    image:
      "https://images.unsplash.com/photo-1560847468-5eef330f455a?w=300&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Toilet Paper (4 rolls)",
    price: 3.0,
    image:
      "https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=300&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Rice (1kg)",
    price: 2.5,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Beans (500g)",
    price: 1.8,
    image:
      "https://images.unsplash.com/photo-1513868853742-e7fb786265db?w=300&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Hand Soap",
    price: 1.2,
    image:
      "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=300&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Toothpaste",
    price: 2.0,
    image:
      "https://images.unsplash.com/photo-1550985543-f1ea83691cd8?w=300&h=300&fit=crop",
  },
  {
    id: 7,
    name: "Canned Soup",
    price: 2.2,
    image:
      "https://images.unsplash.com/photo-1615828578410-ccd1019faa7f?w=300&h=300&fit=crop",
  },
  {
    id: 8,
    name: "Pasta (500g)",
    price: 1.6,
    image:
      "https://images.unsplash.com/photo-1465911817134-741b5e473a1b?w=300&h=300&fit=crop",
  },
];

function ProductCard({ product }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {!imageLoaded && <Skeleton className="w-full h-40 mb-4" />}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-40 object-cover mb-4 rounded-md ${
            imageLoaded ? "block" : "hidden"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.currentTarget.src = `/placeholder.svg?height=160&width=300&text=${encodeURIComponent(
              product.name
            )}`;
            setImageLoaded(true);
          }}
        />
        {imageLoaded ? (
          <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
        ) : (
          <Skeleton className="h-8 w-24" />
        )}
      </CardContent>
      <CardFooter>
        {imageLoaded ? (
          <Button className="w-full">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        ) : (
          <Skeleton className="h-10 w-full" />
        )}
      </CardFooter>
    </Card>
  );
}

export default function Component() {
  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-3xl font-bold mb-6 text-center">
        Essential Items Marketplace
      </h1> */}
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search products..."
          className="max-w-sm mx-auto"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
