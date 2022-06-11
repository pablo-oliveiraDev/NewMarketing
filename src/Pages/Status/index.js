import React, { useContext, useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Titulo from '../../Components/Titulo';
import { ImStatsDots } from 'react-icons/im';
import './status.css';
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns';
import { toast } from 'react-toastify';


export default function Status() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            await firebase.firestore().collection('users')
                .get()
                .then((snapshot) => {
                    updateUsers(snapshot);

                }).catch((error) => {
                    console.log('houve um erro na busca de usuários', error)
                })
        }

        loadUsers();
        return () => {

        }

    }, [])

    async function updateUsers(snapshot) {
        if (snapshot !== 0) {
            let lista = [];

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    nome: doc.data().nome,
                    sobrenome: doc.data().sobrenome,
                    email: doc.data().email,
                    data: format(doc.data().Data.toDate(), 'dd/MM/yyyy')

                })

            })
            setUsers(user => [...user, ...lista]);
        }

    }
    console.log(users)

    return (
        <div className='container-fluid'>
            <Header />
            <div className='content'>
                <Titulo nome='Veja o status'>
                    <ImStatsDots size={35} />

                </Titulo>
            </div>

            <div className='usersStatus'>
                <span className='labelDescricao'>Usuários cadastrados :</span><br />
                {users !== '' ? (users.map((item, index) => {
                    return (
                        <div className='displayStatus' key={index}>
                             <span className='labelCadastrados'>Nome :</span>
                            <span className='itemUser'>{item.nome + ' ' + item.sobrenome}</span><br/>
                            <span className='labelCadastrados'>Email :</span>
                            <span className='itemUser' >{item.email}</span><br/>
                            <span className='labelCadastrados'>Cadastrado em :</span>
                            <span className='itemUser'>{item.data}</span>
                        </div>


                    )

                })) : (
                    <>
                        {toast.info('Tente novamente Servidor nao encontrado!😣')}
                    </>
                )}



            </div>
        </div>
    )
}
