import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dish } from "./types";

interface CartProps {
  cartItems: Set<string>;
  dishes: Dish[];
  onToggleCart: (dishId: string) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, dishes, onToggleCart, onCheckout }) => {
  const cartDishes = dishes.filter(dish => cartItems.has(dish.id));

  return (
    <div className="fixed bottom-0 right-0 m-4 bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold">Carrito</h3>
      {cartDishes.length === 0 ? (
        <p>No hay platos en el carrito.</p>
      ) : (
        <div>
          {cartDishes.map(dish => (
            <div key={dish.id} className="flex justify-between items-center">
              <span>{dish.name}</span>
              <Button onClick={() => onToggleCart(dish.id)}>Eliminar</Button>
            </div>
          ))}
          <Button onClick={onCheckout} className="mt-2">Realizar Pedido</Button>
        </div>
      )}
      <Badge className="mt-2">Total: {cartDishes.length} platos</Badge>
    </div>
  );
};

export default Cart;
