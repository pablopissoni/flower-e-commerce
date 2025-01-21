import { titleFont } from "@/config/fonts";
import Link from "next/link";

export const Footer = () => {
  // TODO: agregar enlaces de redes sociales y de contacto
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link href="/" className="">
        <span className={`${titleFont.className} antialiased font-bold`}>Flower</span>
        <span>| Shop</span>
        {/* simbolo de copyright */}
        <span>© 2025 Flower</span>
      </Link>

      <Link href="/" className="mx-3">
        <span>ubicación</span>
      </Link>
    </div>
  );
};
