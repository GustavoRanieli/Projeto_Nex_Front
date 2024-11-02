import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importa a biblioteca Axios para fazer requisições HTTP
import Imask from 'imask'; // Importa a biblioteca de mascaramento Imask (não está sendo usada no código atualmente)
// Assets
import mySvg from '../assets/Logo-preto-original.394e913d3b64e427de68fea0482e4de9.svg'; // Importa o logo

// Componente principal da página de criação de conta
export default function CreateAccount() {
    const navegate = useNavigate(); // Hook para navegação entre rotas

    // Define o estado inicial dos dados do usuário
    const [userData, setUserData] = useState({
        name: '',
        cpf: '',
        email: '',
        password: '',
        user_type: 1,
    });

    // Função para lidar com mudanças nos campos de entrada
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita o recarregamento da página
        try {
            // Envia os dados do usuário para o servidor usando uma requisição POST
            const response = await axios.post('http://localhost:200/usersController/createUser', userData);
            const data = response.data;
            
            // Verifica a resposta do servidor
            if (data.success === true) {
                navegate('/'); // Redireciona para a página inicial se o cadastro for bem-sucedido
            } else if (data.success === false && data.message === 'Usuário já cadastrado!') {
                alert(data.message); // Exibe mensagem de alerta se o usuário já estiver cadastrado
            } else {
                alert("Quebrou"); // Mensagem padrão para erro
            }
        } catch {
            // Trate qualquer erro adicional, se necessário
        }
    }

    return (
        <div className='bg-stone-700 w-screen flex items-center justify-center h-screen'>
            <div className="container lg:max-w-lg mx-auto bg-gray-800 rounded p-10">
                <div className='py-10'>
                    <img className='w-28' src={mySvg} alt="Logo" /> {/* Exibe o logo */}
                </div>

                {/* Formulário de criação de conta */}
                <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                    {/* Campo para nome */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="name"
                            id="floating_name"
                            value={userData.name}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-950 focus:outline-none focus:ring-0 focus:border-slate-950 peer" placeholder="" required
                        />
                        <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-50 dark:text-gray-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">Name</label>
                    </div>

                    {/* Campo para CPF */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="cpf"
                            id="floating_cpf"
                            value={userData.cpf}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-950 focus:outline-none focus:ring-0 focus:border-slate-950 peer" placeholder=" " required
                        />
                        <label htmlFor="floating_cpf" className="peer-focus:font-medium absolute text-sm text-gray-50 dark:text-gray-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">CPF</label>
                    </div>

                    {/* Campo para e-mail */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="email"
                            name="email"
                            id="floating_email"
                            value={userData.email}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-950 focus:outline-none focus:ring-0 focus:border-slate-950 peer" placeholder=" " required
                        />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-50 dark:text-gray-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">Email address</label>
                    </div>

                    {/* Campo para senha */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="password"
                            name="password"
                            id="floating_password"
                            value={userData.password}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-950 focus:outline-none focus:ring-0 focus:border-slate-950 peer" placeholder=" " required
                        />
                        <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-50 dark:text-gray-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">Password</label>
                    </div>

                    {/* Campo para confirmar senha */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="password"
                            name="repeat_password"
                            id="floating_repeat_password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-950 focus:outline-none focus:ring-0 focus:border-slate-950 peer" placeholder=" " required
                        />
                        <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-50 dark:text-gray-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]">Confirm password</label>
                    </div>

                    {/* Campo para selecionar tipo de usuário */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleione o tipo de usuário</label>
                        <select
                            name='user_type'
                            value={userData.user_type}
                            onChange={handleChange}
                            id="floating_users"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option selected></option>
                            <option value="1">Admin</option>
                            <option value="2">Usuário</option>
                        </select>
                    </div>

                    {/* Botão para enviar o formulário */}
                    <button type="submit" className="text-white bg-slate-700 hover:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-700 dark:hover:bg-slate-950 dark:focus:ring-slate-950">Submit</button>
                    
                    {/* Botão para voltar */}
                    <button
                        type="button"
                        onClick={() => { navegate('/') }}
                        className="text-white bg-slate-700 ml-5 hover:bg-slate-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-700 dark:hover:bg-slate-950 dark:focus:ring-slate-950">Voltar</button>
                </form>
            </div>
        </div>
    )
};
