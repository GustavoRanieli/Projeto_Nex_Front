import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Pagination from './Pagination';
import Filter from './Filter';

// Definição das interfaces para tipagem dos dados
interface Sales {
    fk_user_cpf: string;   // CPF do usuário que fez a venda
    product_name: string;   // Nome do produto vendido
    points: number;         // Pontos acumulados pela venda
    product_value: number;  // Valor do produto vendido
    status: string;         // Status da venda (por exemplo, 'Completo', 'Pendente')
    date: Date;             // Data da venda
}

interface infoUser {
    points: number;         // Pontos totais do usuário
    salesValor: number;     // Valor total das vendas do usuário
}

const Users = () => {
    // Estado para armazenar os dados das vendas e informações do usuário
    const [salesData, setSalesData] = useState<Sales[]>([]); // Array de vendas
    const [infoUser, setInfoUser] = useState<infoUser>({ points: 0, salesValor: 0 }); // Informações do usuário
    const token = Cookies.get('userAuth'); // Obtendo o token de autenticação dos cookies

    // Hook para atualizar os dados das vendas ao montar o componente
    useEffect(() => {
        updateSales(); // Chama a função para atualizar as vendas
    }, []);

    // Função para atualizar os dados das vendas
    const updateSales = async () => {
        try {
            const response = await axios.get('http://localhost:200/salesController/consultSalesUser', {
                headers: {
                    Authorization: `Bearer ${token}` // Enviando o token no cabeçalho da requisição
                }
            });
            setSalesData(response.data.salesUser); // Atualiza o estado com os dados das vendas
            setInfoUser(response.data.infoUser); // Atualiza o estado com as informações do usuário
        } catch (error) {
            console.error('Erro ao enviar dados:', error); // Trata erros na requisição
        }
    };

    // Estado para a paginação
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const [salesPerPage] = useState(5); // Vendas por página

    // Função para mudar a página atual
    const handlePage = (pageNumber) => {
        setCurrentPage(pageNumber); // Atualiza a página atual
    };

    // Função para filtrar os dados das vendas
    const filterChange = async (filter, value) => {
        try {
            const response = await axios.post('http://localhost:200/salesController/filterComumUser', {
                filter,
                value
            },
            {
                headers: {
                    Authorization: `Bearer ${token}` // Enviando o token no cabeçalho da requisição
                }
            });
            setCurrentPage(1); // Reseta para a primeira página após aplicar o filtro
            setSalesData(response.data.salesUser); // Atualiza o estado com os dados filtrados
        } catch (error) {
            console.log(error); // Trata erros na requisição
        }
    };

    return (
        <>
            <div className='bg-gray-500 flex flex-col p-10'>
                <div className='flex flex-row mx-auto space-x-5'>
                    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-64">
                        <svg className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"/>
                        </svg>
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Pontos</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 text-lg">{infoUser.points}</p>
                    </div>
                    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-64">
                        <svg className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"/>
                        </svg>
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Saldo de Vendas</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 text-lg">
                            {`R$ ${new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(infoUser.salesValor)}`}
                        </p>
                    </div>
                </div>
                <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto mt-5">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Extrato</h5>
                        {/* <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                            View all
                        </a> */}
                    </div>
                    <Filter changeFilter={filterChange} functionUser={2} />
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            {salesData.map(sales => (
                                <li className="py-3 sm:py-4" key={sales.fk_user_cpf}>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M19.728 10.686c-2.38 2.256-6.153 3.381-9.875 3.381-3.722 0-7.4-1.126-9.571-3.371L0 10.437V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-7.6l-.272.286Z"></path>
                                                <path d="m.135 7.847 1.542 1.417c3.6 3.712 12.747 3.7 16.635.01L19.605 7.9A.98.98 0 0 1 20 7.652V6a2 2 0 0 0-2-2h-3V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H2a2 2 0 0 0-2 2v1.765c.047.024.092.051.135.082ZM10 10.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5ZM7 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1H7V3Z"></path>
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{sales.product_name}</p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">{`R$ ${new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(sales.product_value)}`}</p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">{`Pontos: ${sales.points}`}</p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">{new Date(sales.date).toLocaleDateString('pt-BR')}</p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">{sales.status}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Pagination 
                        salesPerPage={salesPerPage} 
                        length={salesData.length} 
                        handlePage={handlePage} 
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </>
    );
};

export default Users;
