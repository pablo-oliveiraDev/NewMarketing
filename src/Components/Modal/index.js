import React from 'react';
import './modal.css';

import { FiX } from 'react-icons/fi';


export default function Modal({conteudo, close}){
  return(
    <div className="modal">
      <div className="container">
        <button className="close" onClick={ close }>
          <FiX size={23} color="#FFF" />
          Voltar
        </button>

        <div>

          <div className='image'>
            <img src={conteudo.imageUrl} alt={conteudo.produto} />
          </div>
          <h3>Detalhes do Produto</h3>

          <div className="row">
            <span>
              Nome : <a>{conteudo.produto}</a>
            </span>
          </div>

          <div className="row">
            <span>
              Descrição : <a>{conteudo.descricao}</a>
            </span>
          </div>

          <div className="row">
            <span>
              Categoria : <a>{conteudo.categoria}</a>
            </span>
            <span>
              Cadastrado em : <a>{conteudo.cadastro}</a>
            </span>
          </div>

          

          

        </div>
      </div>
    </div>
  )
}