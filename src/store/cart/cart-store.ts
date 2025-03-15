import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
  getTotalItems: () => number;
}

export const useCartStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({
        cart: [],

        // Metodos
        getTotalItems: () => {
          const { cart } = get();
          return cart.reduce((total, item) => total + item.quantity, 0);
        },

        addProductToCart: (product: CartProduct) => {
          const { cart } = get();

          // 1° Reviso si el producto ya existe en el carrito con la talla seleccionada
          const productInCart = cart.some((item) => item.id === product.id && item.size === product.size);

          if (!productInCart) {
            set({ cart: [...cart, product] });
            return;
          }

          // 2° Si el producto ya existe en el carrito, incremento la cantidad
          const updateCartProducts = cart.map((item) => {
            if (item.id === product.id && item.size === product.size) {
              return { ...item, quantity: item.quantity + product.quantity };
            }
            return item;
          });
          set({ cart: updateCartProducts });
        },
      }),
      {
        name: "shopping-cart",
      }
    )
  )
);
