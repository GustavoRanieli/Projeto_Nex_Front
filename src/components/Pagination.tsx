import React from 'react';

interface PaginationProps {
    salesPerPage: number; // Número de vendas por página
    length: number; // Total de vendas
    handlePage: (pageNumber: number) => void; // Função para lidar com a mudança de página
    currentPage: number; // Página atual
}

const Pagination: React.FC<PaginationProps> = ({ salesPerPage, length, handlePage, currentPage }) => {
    const paginationNumbers: number[] = []; // Array para armazenar os números das páginas
    for (let i = 1; i <= Math.ceil(length / salesPerPage); i++) {
        paginationNumbers.push(i); // Adiciona cada número de página ao array
    }

    return (
        <div className='pagination flex flex-row justify-end'>
            {paginationNumbers.map((pageNumber) => (
                <a 
                href="#" 
                onClick={() => handlePage(pageNumber)} // Chama a função handlePage com o número da página
                key={pageNumber} // Chave única para cada elemento
                className={currentPage === pageNumber ? 
                    "flex items-center justify-center px-4 h-10 leading-tight text-white-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-white-700 dark:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" : 
                    "flex items-center justify-center px-4 h-10 leading-tight text-white-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-white-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}>
                    {pageNumber} {/* Exibe o número da página */}
                </a>
                // <button 
                //     onClick={() => handlePage(pageNumber)} // Alternativa para chamar a função handlePage
                //     key={pageNumber} // Chave única para cada botão
                // >
                //     {pageNumber} {/* Exibe o número da página */}
                // </button>
            ))}
        </div>
    );
};

export default Pagination;
