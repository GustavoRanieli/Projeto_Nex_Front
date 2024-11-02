import React, { useState, useEffect } from 'react'
import * as XLSX from 'xlsx';
import axios from 'axios';

import Pagination from './Pagination';
import Filter from './Filter';

// Definição da interface para o tipo de dados das vendas
interface Sales {
    fk_user_cpf: string;   // CPF do usuário
    product_name: string;  // Nome do produto
    points: number;        // Pontos associados à venda
    product_value: number; // Valor do produto
    status: string;        // Status da venda
    date: Date;            // Data da venda
}

const Admin = () => {
    // Estados para gerenciamento dos dados e exibição
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [salesData, setSalesData ] = useState<Sales[]>([]);
    const [salesPerPage] = useState(5); // Define quantas vendas são exibidas por página
    const [isDragOver, setIsDragOver] = useState(false); // Estado para monitorar drag-and-drop
    const [fileUploaded, setFileUploaded] = useState(false); // Estado para monitorar upload de arquivo

    // useEffect para atualizar as vendas quando o componente é montado
    useEffect(() => {
        updateSales()
    }, [])

    // Função para buscar dados das vendas
    const updateSales = async () => {
        try {
            const response = await axios.get('http://localhost:200/salesController/consultSalesAdmin');
            setSalesData(response.data.salesAdmin);
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    }    

    // Função para processar o arquivo de upload
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0] || e.dataTransfer?.files?.[0];
        if (!file) return;

        setFileUploaded(true); // Marca o arquivo como carregado
        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryStr = event.target?.result as string;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json<Record<string, any>>(sheet);
            setData(jsonData); // Define os dados da planilha
        };
        reader.readAsBinaryString(file); 
    };

    // Função para enviar os dados carregados para o backend
    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:200/salesController/insertXls', data);
            updateSales();
            alert('Dados enviados com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    // Paginação: calcula os índices de início e fim da lista atual
    const indexOfLastSale = currentPage * salesPerPage;
    const indexOfFirstSale = indexOfLastSale - salesPerPage;
    const currentSales = salesData.slice(indexOfFirstSale, indexOfLastSale); // Define as vendas da página atual

    // Função para mudar de página
    const handlePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Função para aplicar filtro nas vendas
    const filterChange = async ( filter, value ) => {
        try {
            const response = await axios.post('http://localhost:200/salesController/filterAdmin', {
                filter,
                value
            });
            setCurrentPage(1)
            setSalesData(response.data.salesAdmin);
        } catch (error) {
            console.log(error);
        }
    }

    // Funções de drag-and-drop para indicar o status de upload
    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragOver(false);
        handleFileUpload(event); // Chama a função de upload com o evento de drop
    };

    return (
        <div className='bg-gray-800 min-h-screen w-screen pb-10'>
            <div className="flex justify-center w-full container mx-auto p-10 flex-col">
                {/* Área de upload de arquivo */}
                <h1 className='text-xl font-bold leading-none text-gray-900 dark:text-white mb-5'>ENVIE AQUI SUA PLANILHA EXCEL:</h1>
                <label 
                    htmlFor="dropzone-file" 
                    className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ${
                        isDragOver ? 'bg-gray-100 dark:bg-gray-600' : 'dark:bg-gray-700 hover:bg-gray-100'
                    } dark:hover:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop} >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Clique para enviar</span> ou arraste e solte</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">.Xlsx</p>
                    </div>
                    <input 
                        type="file" 
                        accept=".xlsx, .xls" 
                        onChange={handleFileUpload} 
                        id="dropzone-file" 
                        className="hidden" />
                </label>
                <button onClick={handleSubmit}
                className={`text-xl font-bold leading-none text-gray-900 dark:text-white mt-5 bg-black p-4 rounded w-96 mx-auto ${
                    fileUploaded ? 'bg-green-500' : 'bg-black'
                }`}
                disabled={!fileUploaded} >ENVIAR ARQUIVO</button>
            </div> 

            {/* Área de exibição dos extratos */}
            <div className='container rounded shadow-md bg-slate-900  w-full mx-auto p-10 mb-36'>
                <div className='flex flex-row justify-between'>
                    <h1 className='text-xl font-bold leading-none text-gray-900 dark:text-white mb-5'>Todos extratos:</h1>
                    <Filter changeFilter={filterChange} functionUser={1} />
                </div>
                <div>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 ">
                            {salesData.length > 0 ? (
                                currentSales.map(sales => (
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center">
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
                                                    {sales.fk_user_cpf}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    {sales.product_name}
                                                </p>
                                                <p className='items-center text-white font-normal'>
                                                    {new Date(sales.date).toLocaleDateString('pt-BR', {
                                                        year: 'numeric',
                                                        month: '2-digit',
                                                        day: '2-digit'
                                                    }).replace(/\//g, '-')}
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center flex flex-col">
                                                <p className='text-white font-normal'>{sales.points}</p>
                                                <p className='text-base font-semibold text-gray-900 dark:text-white'>
                                                    {`R$ ${new Intl.NumberFormat('pt-BR', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2
                                                    }).format(sales.product_value)}`}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <div>
                                    <h1>Sem informações</h1>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
                {/* Componente de paginação */}
                <Pagination length={salesData.length} salesPerPage={salesPerPage} handlePage={handlePage} currentPage={currentPage} />
            </div>
        </div>
    )
}

export default Admin;
