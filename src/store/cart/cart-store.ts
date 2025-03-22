import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { TAX } from "@/utils";

interface State {
  cart: CartProduct[];

  // Metodos
  getTotalItems: () => number;
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, updateQuantity: number) => void;
  removeProductFromCart: (product: CartProduct) => void;
  getSummaryInformation: () => { subTotal: number; tax: number; total: number; itemInCart: number };
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

        getSummaryInformation: () => {
          const { cart } = get();
          const subTotal = cart.reduce((subTotal, product) => product.quantity * product.price + subTotal, 0);
          const tax = subTotal * TAX;
          const total = subTotal + tax;

          const itemInCart = cart.reduce((total, item) => total + item.quantity, 0);

          return {
            subTotal: Number(subTotal.toFixed(2)),
            tax: Number(tax.toFixed(2)),
            total: Number(total.toFixed(2)),
            itemInCart: itemInCart,
          };
        },
      }),

      {
        name: "shopping-cart",
      }
    )
  )
);
