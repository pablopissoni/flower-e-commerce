import { titleFont } from "@/config/fonts";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="">Flower e-commerce</h1>
      <h1 className={titleFont.className}>Flower e-commerce</h1>
    </div>
  );
}
