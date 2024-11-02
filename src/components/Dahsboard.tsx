import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';


// Components
import Admin from './Admin';
import users from './Users';

// Assets
import mySvg from '../assets/Logo-preto-original.394e913d3b64e427de68fea0482e4de9.svg';
import Users from './Users';


// Interface para definir o tipo de dados do usuário
interface UserInfo {
    name: string,
    email: string,
    function: number,
    balance: number,
    cpf: string,
    password: string,
    _id: number
}

export default function Dashboard() {
    const navigate = useNavigate();
    const [userInfo, setInfoUser] = useState<UserInfo | null>(null) // Estado para armazenar dados do usuário
    const token = Cookies.get('userAuth'); // Obtém o token de autenticação dos cookies

    useEffect(() => {
        const getUser = async () => {
            if (token) {
                try {
                    const response = await axios.get('http://localhost:200/usersController/consultUser', {
                        headers: {
                            Authorization: `Bearer ${token}` // Enviando o token no cabeçalho
                        }
                    });
                    setInfoUser(response.data[0]) // Armazena as informações do usuário no estado
                } catch (error) {
                    console.log(error) // Exibe erros no console
                }
            } else {
                navigate('/') // Redireciona para a página inicial se não houver token
            }
        };
        getUser(); // Chama a função para buscar informações do usuário
    }, []);

    async function logout() {
        const response = await axios.get('http://localhost:200/usersController/logoutUser', {
            headers: {
                Authorization: `Bearer ${token}` // Enviando o token no cabeçalho
            }
        });
        Cookies.remove('userAuth'); // Remove o token de autenticação dos cookies
        navigate('/'); // Redireciona para a página inicial após o logout
    }

    return (
        <div className='w-screen h-screen'>
            {userInfo ? ( // Renderiza o conteúdo principal se houver informações do usuário
                <>
                    <header className='bg-gray-600'>
                        <div className='flex container flex-wrap items-center justify-between mx-auto space-x-96 p-3'>
                            <div className='flex flex-nowrap space-x-4 items-center me-4'>
                                <div>
                                    <img className='w-10' src={mySvg} alt="Logo" /> {/* Exibe o logo */}
                                </div>
                                <div className=''>
                                    <h5 className='text-slate-50 font-bold text-lg'>Bem vindo(a), {userInfo.name}!</h5> {/* Exibe o nome do usuário */}
                                </div>
                            </div>
                            <div className='flex space-x-1 items-center'>
                                {/* Ícone de perfil */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-slate-50 hover:text-slate-950 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                {/* Ícone de logout */}
                                <svg onClick={logout} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-slate-50 hover:text-slate-950 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                                </svg>
                            </div>
                        </div>
                    </header>
                    <div className='bg-gray-500 h-screen'>
                        {userInfo.function == 1 ? (
                            <Admin /> // Renderiza o componente Admin se a função do usuário for 1
                        ) : (
                            <Users /> // Renderiza o componente Users para outras funções de usuário
                        )}
                    </div>
                </>
            ) : (
                <div>
                    <h1>Sem Informações! </h1> {/* Exibe mensagem de fallback caso não haja dados de usuário */}
                </div>
            )}
            
        </div>
    )
}
