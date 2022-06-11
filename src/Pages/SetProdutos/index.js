import React, { useState } from 'react';
import Header from '../../Components/Header';
import Titulo from '../../Components/Titulo';
import { FiPlusCircle, FiSettings } from 'react-icons/fi';
import './setProdutos.css';
import { TiShoppingCart } from 'react-icons/ti';
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';



export default function SetProdutos() {
    const [loading, setLoading] = useState(false);
    const [produto, setProduto] = useState('');
    const [selectCategoria, setSelectCategoria] = useState('Educacao');
    const [imageProduto, setImageProduto] = useState(null);
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [link, setLink] = useState('');
    const [configDisable, setConfigDisable] = useState(false);





    function handleFile(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                setImageProduto(image);


            } else {
                alert('Envie uma imagem do tipo jpeg ou PNG');
                setImageProduto(null);
                return null;
            }

        }


    }

    async function uploadImages(e) {
        e.preventDefault();
        setLoading(true);
        const uploadTask = await firebase.storage()
            .ref(`images/${produto}`)
            .put(imageProduto)
            .then(async () => {
                setLoading(false);
                console.log('Foto enviada com sucesso!');

                await firebase.storage()
                    .ref(`images`)
                    .child(produto)
                    .getDownloadURL()
                    .then(async (url) => {
                        let fotoUrl = url;

                        if (produto !== '' && imageProduto !== null && preco !== '' && descricao !== '' &&
                            link !== '') {



                            await firebase.firestore().collection('produtos')
                                .add({
                                    categoria: selectCategoria,
                                    produto: produto,
                                    imageProduto: null,
                                    imageUrl: fotoUrl,
                                    preco: preco,
                                    cadastro: new Date(),
                                    descricao: descricao,
                                    link: link,



                                }, setLoading(true))

                                .then(() => {

                                    setProduto('');
                                    setImageProduto('');
                                    setPreco('');
                                    setDescricao('');
                                    setLink('');
                                    setLoading(false);
                                    toast.info('OK!Novo produto cadastrado com sucesso!👍');



                                })
                                .catch((error) => {
                                    console.log(error);
                                    toast.error('Erro ao cadastrar um novo produto!🙄');

                                })

                        } else {
                            toast.info('Todos os campos devem ser devidamente preenchidos!🧐');

                        }
                    })
            })



    }



    function handleChangeCateg(e) {
        setSelectCategoria(e.target.value);

    }




    return (
        <div className='container-fluid'>
            <Header />
            <div className='content'>
                <Titulo nome='Editar Produto'>
                    <FiPlusCircle size={35} />
                </Titulo>
                <div className='displayCadastroPro'>
                    <div className='cadastroPro'>
                        <div className='logoFormPro'>
                            <h2>New Marketing</h2>
                            <TiShoppingCart size={45} color='#fff' />
                        </div>
                        <form className='formCadastroPro' onSubmit={uploadImages}>

                            <label className='labelPro' >Categoria :</label>
                            <select name='Selecione uma opção'  onMouseLeave={()=>setConfigDisable(false)}  onClick={()=>setConfigDisable(true)}className='selectPro' value={selectCategoria} onChange={handleChangeCateg} >
                                
                                <option value={''} disabled={configDisable} >selecione uma opção</option>
                                <option value={'educacao'}>Educação</option>
                                <option selected value={'beleza'}>Beleza</option>
                                <option value={'lazer'}>Lazer</option>
                                <option value={'saude'}>Saúde</option>
                               
                        </select><br />

                        <label className='labelPro'>Produto :</label>
                        <input className='inputPro' type='text' value={produto} onChange={(e) => setProduto(e.target.value)} placeholder='Digite o nome do produto' /><br />
                        <label className='labelPro' >Preço :</label>
                        <input className='inputPro' type='text' value={preco} onChange={(e) => setPreco(e.target.value)} placeholder='R$ : 00,00' /><br />
                        <label className='labelPro'>Link Prod.:</label>
                        <input className='inputPro' type='text' value={link} onChange={(e) => setLink(e.target.value)} placeholder='https://meuproduto.com' /><br />
                        <label className='labelPro'>Foto :</label>
                        <input className='inputPro' type='file' accept='image/*' onChange={handleFile} /><br />
                        <label className='labelPro' >Decrição :</label>
                        <textarea className='textareaPro' type='text' value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder='Digite uma pequena descrição do produto' />

                        <button className='buttonPro' type='submit'>{loading ? 'Salvando...' : 'Salvar'}</button>
                        <Link to='/configsProduto'><button className='edit'><FiSettings size={35} /></button></Link>
                    </form>

                </div>

            </div>
        </div>

        </div >
    )
}
