import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

// Assets
import mySvg from '../assets/Logo-preto-original.394e913d3b64e427de68fea0482e4de9.svg';

export default function Login() {
    const navigate = useNavigate(); // Hook para navegar entre rotas

    const [userInfo, setUserInfo ] = useState({
        email: '', // Campo de email
        password: '' // Campo de senha
    });

    function handleChangeLogin(e){ // Função para lidar com mudanças nos campos de entrada
        const { name, value } = e.target; // Desestrutura o nome e o valor do evento
        setUserInfo({
            ...userInfo, // Mantém os valores anteriores
            [name]: value // Atualiza o campo correspondente
        })
    };

    const login = async (e) => { // Função assíncrona para realizar o login
        e.preventDefault(); // Previne o comportamento padrão do formulário
        try{
            const response = await axios.post('http://localhost:200/usersController/loginUser', userInfo); // Envia a requisição de login
            const data = response.data; // Obtém os dados da resposta
            if(data.success == true){ // Verifica se o login foi bem-sucedido
                Cookies.set('userAuth', data.user, { expires: 7, secure: true, sameSite: 'Strict' }); // Define o cookie de autenticação
                navigate('/userDashbord'); // Navega para o dashboard do usuário
            }else{
                alert(data.message || "Credenciais incorretas"); // Exibe mensagem de erro
            }
        }
        catch (error) {
            console.error("Erro ao fazer login:", error); // Loga o erro no console
            console.log("Ocorreu um erro ao tentar fazer login."); // Mensagem de erro genérica
        }
    };

    return(
        <div className="bg-stone-700 w-screen flex items-center justify-center h-screen">
            <div className="container lg:max-w-lg mt-32 mx-auto p-6 rounded shadow-md bg-gray-600">
                <div>
                    <img src={mySvg} alt="Logo Nex" className='mx-auto w-60 p-10' /> {/* Logo da aplicação */}
                </div>
                <div>
                    <form onSubmit={login}> {/* Formulário de login */}
                        <div className='my-5'>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                            <input 
                                type="email" 
                                id="floating_email"
                                name ="email" // Nome do campo de entrada
                                value={userInfo.email} // Valor do campo de email
                                onChange={handleChangeLogin} // Chama a função ao alterar o valor
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                        </div>
                        <div className='my-5'>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input 
                                type="password" 
                                id="floating_password" 
                                name ="password" // Nome do campo de entrada
                                value={userInfo.password} // Valor do campo de senha
                                onChange={handleChangeLogin} // Chama a função ao alterar o valor
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                        </div>
                        <a className='hover:underline block mb-2 text-sm font-medium text-gray-900 dark:text-white' href="/createAccount"><p>Criar conta</p></a> {/* Link para criar uma nova conta */}
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar</button> {/* Botão de envio */}
                    </form>
                </div>
            </div>
        </div>
    );
};
