import React, { createContext, useEffect, useState } from 'react';
import firebase from '../services/firebaseConnection';
import { toast } from 'react-toastify';


export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [superUser, setSuperUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function loadingStorage() {
            const storageUser = localStorage.getItem('NewMarketing');
            if (storageUser) {
                setSuperUser(JSON.stringify(storageUser));
                setUser(JSON.stringify(storageUser));
                setLoading(false);
            }
            setLoading(false);
        }

        loadingStorage();

    }, [])
    //login user

    async function signin(email, password) {
        setLoadingAuth(true);
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                const userProfile = await firebase.firestore().collection('users')
                    .doc(uid).get();
                let data = {
                    uid: uid,
                    nome: userProfile.data().nome,
                    sobrenome: userProfile.data().sobrenome,
                    email: userProfile.data().email,
                    senha: userProfile.data().senha
                };
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success('Bem vindo!Ficamos felizes por estar aqui!😍')
            })
            .catch((error) => {
                console.log(error);
                setLoadingAuth(false);
                toast.error('Que pena!\nAlgo deu errado!😢')

            })
    }

    //superUser
    async function signinSuper(email, password) {
        setLoadingAuth(true);
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;
                const userProfile = await firebase.firestore().collection('superUser')
                    .doc(uid).get();
                let superdata = {
                    Snome: userProfile.data().nome,
                    Semail: userProfile.data().email,
                    Ssenha: userProfile.data().senha,
                    status:userProfile.data().status
                };
                setSuperUser(superdata);
                storageUser(superdata);
                setLoadingAuth(false);
                toast.success('Olá super-user!😍')
            })
            .catch((error) => {
                console.log(error);
                setLoadingAuth(false);
                toast.error('Que pena!\n Você nao e um super-user!😢')

            })
    }
    //cadastro de novo user
    async function signUp(email, senha, nome, sobrenome) {
        setLoadingAuth(true);

        await firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(async (value) => {
                let uid = value.user.uid;
                await firebase.firestore().collection('users')
                    .doc(uid).set({
                        nome: nome,
                        sobrenome: sobrenome,
                        email:email,
                        senha:senha,
                        Data: new Date()

                    })
                    .then(() => {
                        let data = {
                            uid: uid,
                            nome: nome,
                            email: value.user.email
                        };
                        setUser(data);
                        storageUser(data);
                        setLoadingAuth(false);
                        toast.success('Seja bem vindo!\nSurprenda-se com nossas novidades!🤩')
                    });


            })
            .catch((error) => {
                console.log(error);
                setLoadingAuth(false);
                toast.error('Que pena!\nAlgo deu errado!😢')

            });
    }

    //cadastro superUser
    async function signUpSuper(email, senha, nome,status) {
        setLoadingAuth(true);

        await firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(async (value) => {
                let uid = value.user.uid;
                await firebase.firestore().collection('superUser')
                    .doc(uid).set({
                        nome: nome,
                        senha:senha,
                        email:email,
                        status:status
                    })
                    .then(() => {
                        let superdata = {
                            uid: uid,
                            nome: nome,
                            email: value.user.email
                        };
                        setSuperUser(superdata);
                        storageUser(superdata);
                        setLoadingAuth(false);
                        toast.success('Olá super-user!🤩')
                    })


            })
            .catch((error) => {
                console.log(error);
                setLoadingAuth(false);
                toast.error('Você nao e um super-user!\nContate o adm!😢')

            })
    }


    //localstorage
    function storageUser(data,superdata) {
        localStorage.setItem('NewMarketing', JSON.stringify(data,superdata));

    }

    //superuser

    //logout
    async function signOut() {
        await firebase.auth().signOut();
        localStorage.removeItem('NewMarketing');
        setUser(null);
        setSuperUser(null);
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            superSigned: !!superUser,
            loading,
            user,
            signUp,
            signUpSuper,
            signOut,
            signinSuper,
            signin,
            loadingAuth,
            setUser,
            setSuperUser,
            storageUser
        }}
        >
            {children}

        </AuthContext.Provider>
    )

}

export default AuthProvider