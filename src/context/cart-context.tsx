"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, LocationDTO, ProductDTO } from "@/lib/types";

type CartContextValue = {
  items: CartItem[];
  location: LocationDTO | null;
  isHydrated: boolean;
  addItem: (product: ProductDTO, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  setLocation: (location: LocationDTO) => void;
  clearCart: () => void;
  subtotal: number;
  totalCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "ellas-nail-bar-cart";

type PersistedCart = {
  items: CartItem[];
  location: LocationDTO | null;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [location, setLocationState] = useState<LocationDTO | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PersistedCart;
        setItems(parsed.items ?? []);
        setLocationState(parsed.location ?? null);
      }
    } catch {
      // ignore corrupted storage
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    const payload: PersistedCart = { items, location };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [items, location, isHydrated]);

  const addItem = useCallback((product: ProductDTO, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.productId === product.id);
      if (existing) {
        return current.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...current,
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: Number(product.price),
          image: product.imageUrl,
          quantity,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems((current) => current.filter((item) => item.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setItems((current) =>
      current.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  }, []);

  const setLocation = useCallback((loc: LocationDTO) => {
    setLocationState(loc);
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setLocationState(null);
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      location,
      isHydrated,
      addItem,
      removeItem,
      updateQuantity,
      setLocation,
      clearCart,
      subtotal,
      totalCount,
    }),
    [items, location, isHydrated, addItem, removeItem, updateQuantity, setLocation, clearCart, subtotal, totalCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
