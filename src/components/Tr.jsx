import React, { Component } from 'react';

class Tr extends Component {
  render() {
    return (
      <thead className="border-b bg-violet-500">
        <tr>
          <th className="text-sm font-medium text-white px-6 py-4 border-r">Descrição</th>
          <th className="text-sm font-medium text-white px-6 py-4 border-r">Tag</th>
          <th
            className="text-sm font-medium text-white px-6 py-4 border-r"
          >
            Método de pagamento

          </th>
          <th className="text-sm font-medium text-white px-6 py-4 border-r">Valor</th>
          <th className="text-sm font-medium text-white px-6 py-4 border-r">Moeda</th>
          <th
            className="text-sm font-medium text-white px-6 py-4 border-r"
          >
            Câmbio utilizado

          </th>
          <th
            className="text-sm font-medium text-white px-6 py-4 border-r"
          >
            Valor convertido

          </th>
          <th
            className="text-sm font-medium text-white px-6 py-4 border-r"
          >
            Moeda de conversão

          </th>
          <th
            className="text-sm font-medium text-white px-6 py-4 border-r"
          >
            Editar/Excluir

          </th>
        </tr>
      </thead>
    );
  }
}

export default Tr;
