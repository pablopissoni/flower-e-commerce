import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  // Metodos
  getTotalItems: () => number;
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, updateQuantity: number) => void;
  removeProductFromCart: (product: CartProduct) => void;
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

        updateProductQuantity: (product: CartProduct, updateQuantity: number) => {
          const { cart } = get();
          const updateCartProduct = cart.map((item) => {
            if (item.id === product.id && item.size === product.size) {
              return { ...item, quantity: updateQuantity };
            }
            return item;
          });

          set({ cart: updateCartProduct });
        },

        removeProductFromCart: (product: CartProduct) => {
          const { cart } = get();
          const updateListProductsCart = cart.filter((item) => !(item.id === product.id && item.size === product.size));
          set({ cart: updateListProductsCart });
        },
      }),

      {
        name: "shopping-cart",
      }
    )
  )
);
