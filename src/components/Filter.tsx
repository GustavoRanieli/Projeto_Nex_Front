import React, { useState } from 'react';

interface FilterProps {
    functionUser: number;
    changeFilter: (filter: string, value: string) => void;
}

const Filter: React.FC<FilterProps> = ({ changeFilter, functionUser }) => {
    // Estado para armazenar o critério de filtro selecionado
    const [filterCriteria, setFilterCriteria] = useState('');
    // Estado para armazenar o valor do filtro
    const [filterValue, setFilterValue] = useState('');

    // Atualiza o critério de filtro ao selecionar uma nova opção
    const handleCriteriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterCriteria(e.target.value);
        setFilterValue(''); // Limpa o valor do filtro ao mudar o critério
    };

    // Atualiza o valor do filtro conforme o usuário digita
    const handleFilterValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value == '') {
            // Se o valor do filtro estiver vazio, limpa o filtro aplicado
            changeFilter('', '');
            setFilterValue(e.target.value); // Define o valor do filtro
        } else if (filterCriteria === 'date') {
            // Formata a data para o padrão brasileiro se o critério for 'date'
            setFilterValue(new Date(e.target.value).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).replace(/\//g, '-'));
        } else {
            setFilterValue(e.target.value); // Define o valor do filtro
        }
    };

    // Envia o filtro aplicado quando o botão de busca é clicado
    const submitFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // Só aplica o filtro se o critério e valor estiverem preenchidos
        if (filterCriteria && filterValue) {
            changeFilter(filterCriteria, filterValue);
        }
    };

    return (
        <div>
            <select
                className="w-24 p-2 rounded shadow"
                value={filterCriteria}
                onChange={handleCriteriaChange}
            >
                <option value="">Selecione o critério de busca</option>
                {/* Exibe a opção de CPF apenas se functionUser for igual a 1 */}
                {functionUser === 1 && <option value="fk_user_cpf">CPF</option>}
                <option value="date">Data de Venda</option>
                <option value="product_name">Nome do Produto</option>
                <option value="product_value">Valor do Produto</option>
                <option value="status">Status</option>
            </select>
            
            {/* Campo para inserir o valor do filtro */}
            <input
                className="w-444 mx-5 p-2 rounded shadow"
                type={filterCriteria === 'date' ? 'date' : 'text'}
                placeholder="Valor para busca"
                onChange={handleFilterValueChange}
                value={filterValue}
                disabled={!filterCriteria} // Desativa o campo se nenhum critério for selecionado
            />
            
            {/* Botão para submeter o filtro */}
            <button
                onClick={submitFilter}
                className="bg-white shadow p-2 rounded"
                type="submit"
            >
                Buscar
            </button>
        </div>
    );
};

export default Filter;
