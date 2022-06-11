import React,{useContext, useState} from 'react';
import '../CadUser/cadUser.css';
import {TiShoppingCart} from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { RiLoginBoxLine } from 'react-icons/ri';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import Header from '../../Components/Header';
import Titulo from '../../Components/Titulo';
import { AuthContext } from '../../Contexts/Auth';

export default function LoginUser() {

    const [visible, setVisible] = useState(true);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const {loadingAuth,signin}=useContext(AuthContext);

    function handleSubmit(e){
      e.preventDefault();
      if( email !== '' & senha!==''){
        signin(email,senha);
        setEmail('');
        setSenha('');
      }
      

    }

  return (
    <div className='container-fluid'>
    <Header />
    <div className='content'>
      <Titulo nome='Login'>
        <RiLoginBoxLine size={25} />
      </Titulo>
    </div>
    <div className='displayCadastro'>
      <div className='cadastro'>
        <div className='logoForm'>
          <h2>New Marketing</h2>
          <TiShoppingCart size={45} color='#fff' />
        </div>
        <form className='formCadastro' onSubmit={handleSubmit}>

        
          <label>Email :</label>
          <input type='text' placeholder='Digite aqui seu melhor email' value={email} onChange={(e) => setEmail(e.target.value)} required /><br /><br />

          <div className='boxSenha'>
            <label>Senha :</label>
            <input type={visible ? 'password' : 'text'} placeholder='Digite aqui sua senha' value={senha} onChange={(e) => setSenha(e.target.value)} required />
            <i onClick={() => setVisible(!visible)} role='button'>{visible ? <BsEyeSlash size={20}  className='eyes'/> : <BsEye size={20}  className='eyes'/>}</i>
          </div><br />
          <Link to='/CadUser' className='link'>Ainda nao tem uma conta</Link>
          <button type='submit'>{loadingAuth ? 'Entrando...' : 'Entrar'}</button>

        </form>
       
      </div>
      
    </div>

  </div>
  )
}
