import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/Auth';
import './titulo.css';

export default function Titulo({children,nome}) {
  const {signOut}=useContext(AuthContext);
  return (
    <div className='content'>
        {children}
      <span>{nome}</span>
      <button className='btn-logout' onClick={signOut}>Logout</button>
    </div>
  )
}
