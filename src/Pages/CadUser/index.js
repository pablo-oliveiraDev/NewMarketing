import React, { useContext, useState } from 'react';
import Header from '../../Components/Header';
import Titulo from '../../Components/Titulo';
import { AiOutlineUser } from 'react-icons/ai';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import { AuthContext } from '../../Contexts/Auth';
import './cadUser.css';
import {TiShoppingCart} from 'react-icons/ti';
import { Link } from 'react-router-dom';


export default function CadUser() {
  const [visible, setVisible] = useState(true);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { signUp, loadingAuth } = useContext(AuthContext);


  function handleSubmit(e) {
    e.preventDefault();
    if (nome !== '' && sobrenome !== '' && email !== '' && senha !== '') {
      signUp(email, senha, nome, sobrenome)
    }

  }
  return (
    <div className='container-fluid'>
      <Header />
      <div className='content'>
        <Titulo nome='Novo Usuário'>
          <AiOutlineUser size={25} />
        </Titulo>
      </div>
      <div className='displayCadastro'>
        <div className='cadastro'>
          <div className='logoForm'>
            <h2>New Marketing</h2>
            <TiShoppingCart size={45} color='#fff' />
          </div>
          <form className='formCadastro' onSubmit={handleSubmit}>

            <label>Nome :</label>
            <input type='text' placeholder='Digite aqui seu nome' value={nome} onChange={(e) => setNome(e.target.value)} required /><br /><br />
            <label>Sobrenome :</label>
            <input type='text' placeholder='Digite aqui seu sobrenome' value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} required /><br /><br />
            <label>Email :</label>
            <input type='text' placeholder='Digite aqui seu melhor email' value={email} onChange={(e) => setEmail(e.target.value)} required /><br /><br />

            <div className='boxSenha'>
              <label>Senha :</label>
              <input type={visible ? 'password' : 'text'} placeholder='Digite aqui sua senha' value={senha} onChange={(e) => setSenha(e.target.value)} required />
              <i onClick={() => setVisible(!visible)} role='button'>{visible ? <BsEyeSlash size={20}  className='eyes'/> : <BsEye size={20}  className='eyes'/>}</i>
            </div><br />
            <Link to='/loginUser' className='link'>Já tenho uma conta</Link>
            <button type='submit'>{loadingAuth ? 'Salvando...' : 'Salvar'}</button>

          </form>
         
        </div>
        
      </div>

    </div>
  )
}
