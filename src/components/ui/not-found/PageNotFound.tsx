import Link from "next/link";

export const PageNotFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className={`&{titleFont.className} antialiased text-9xl`}>404</h2>
        <p className="font-semibold text-xl">La página que buscas no existe</p>
        <Link href="/" className="mt-5 text-xl hover:text-blue-400">
          Volver a la página principal
        </Link>
      </div>
    </div>
  );
};
