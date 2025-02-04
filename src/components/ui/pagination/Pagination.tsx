"use client";
import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  // Obtengo la query 'page' a medida que se navega y a su vez usandolo como acumulador y valido que sea un numero
  const pageNumber = Number(searchParams.get("page") ?? 1);
  const currentPage = isNaN(pageNumber) ? 1 : pageNumber;

  if (currentPage < 1 || currentPage % 1 !== 0) redirect(pathName); // Redirecciona a la pagina 1 si es un numero decimal o negativo

  const allPages = generatePaginationNumbers(currentPage, totalPages); // Array con numero de paginas a mostrar en la paginacion

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString()); // Observar que no de problemas convertir el objeto a string inmediatamente

    if (pageNumber === "...") {
      // params.delete('page')
      return `${pathName}?${params}`;
    }

    if (+pageNumber <= 0) {
      params.set("page", "1");
      return `${pathName}?${params}`;
    }

    if (+pageNumber > totalPages) {
      params.set("page", totalPages.toString());
      return `${pathName}?${params}`;
    }

    params.set("page", pageNumber.toString());
    return `${pathName}?${params}`;
  };

  return (
    <div className="flex justify-center text-center mt-10 mb-32">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          {/* Boton Pagina anterior */}
          <li className="page-item ">
            <Link
              className={clsx(
                "page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                {
                  "pointer-events-none text-gray-400": currentPage === 1,
                }
              )}
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline className="h-5 w-5" />
            </Link>
          </li>

          {/* Paginas actuales a seleccionar */}
          {allPages.map((pageNumber, index) => (
            <li className="page-item" key={index}>
              <Link
                className={clsx(
                  "page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-300 hover:shadow-sm",
                  {
                    "pointer-events-none bg-blue-500 text-white hover:text-white hover:bg-blue-700":
                      pageNumber === currentPage,
                    "pointer-events-none": pageNumber === "...",
                  }
                )}
                href={createPageUrl(pageNumber)}
                aria-disabled={pageNumber === currentPage}
              >
                {pageNumber}
              </Link>
            </li>
          ))}

          {/* Boton Pagina siguiente */}
          <li className="page-item">
            <Link
              className={clsx(
                "page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                {
                  "pointer-events-none text-gray-400": currentPage === totalPages,
                }
              )}
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline className="h-5 w-5" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
