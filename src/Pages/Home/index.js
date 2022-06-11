import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Titulo from '../../Components/Titulo';
import { FcHome } from 'react-icons/fc';
import './home.css';
import firebase from '../../services/firebaseConnection';
import { Card, Button } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { TiShoppingCart } from 'react-icons/ti';
import { format } from 'date-fns';
import Modal from '../../Components/Modal';


export default function HomePage() {

  const [listProdutos, setListProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [substring, setSubstring] = useState(47);
  const [selectCategoria, setSelectCategoria] = useState('');
  const [filter, setFilter] = useState();
  const [pesqTitulo, setPesqTitulo] = useState('');
  const [tituloFilter, setTituloFilter] = useState([]);
  const [detail, setDetail] = useState();
  const [mostrarModal, setMostrarModal] = useState(false);
 


  const [checkedRadio, setCheckedRadio] = useState('titulo');

  //leitura bd produtos
  useEffect(() => {
    async function handleProdutos() {
      await firebase.firestore().collection('produtos')
        .get()
        .then((snapshot) => {
          updateProdutos(snapshot)

        }).catch((error) => {
          console.log('houve falha na leitura', error)
        })
    }
    handleProdutos();
    return () => {

    }

  }, [])



  async function updateProdutos(snapshot) {
    const isCollectionEmpty = snapshot.size === 0;
    if (!isCollectionEmpty) {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          categoria: doc.data().categoria,
          produto: doc.data().produto,
          imageProduto: doc.data().imageProduto,
          imageUrl: doc.data().imageUrl,
          preco: doc.data().preco,
          cadastro: format(doc.data().cadastro.toDate(), 'dd/MM/yyyy'),
          descricao: doc.data().descricao,
          link: doc.data().link
        })

      })
      const lastDoc = snapshot.docs[snapshot.docs.length - 1];
      setListProdutos(produtos => [...produtos, ...lista]);

    }

  }
  //effect de pesquisa por categoria
  const lowerSelectCategoria = selectCategoria.toLowerCase();

  useEffect(() => {
    setFilter(
      Object.values(listProdutos).filter((item) =>
        item.categoria.toLowerCase().includes(lowerSelectCategoria)
      )
    )

  }, [lowerSelectCategoria, listProdutos]);
  //effect de pesquisa por titulo
  const lowerPesqTitulo = pesqTitulo.toLowerCase();

  useEffect(() => {
    setTituloFilter(
      Object.values(listProdutos).filter((item) =>
        item.produto.toLowerCase().includes(lowerPesqTitulo)
      )
    )
  }, [lowerPesqTitulo, listProdutos])

  // console.log(pesquisaRadio)
  function handleClick(e) {
    e.target.value === 'categoria' && setPesqTitulo('');
    e.target.value === 'titulo' && setSelectCategoria('');
    return setCheckedRadio(e.target.value);

  }

  function handleSelectedCateg(e) {
    e.preventDefault();
    setSelectCategoria(e.target.value)

  }
  function handlePesquisa(e) {
    e.preventDefault();
    setPesqTitulo(e.target.value);
  }

  function togglePostModal(item) {

    setMostrarModal(!mostrarModal);
    setDetail(item);
  }

  return (
    <div className='container-fluid'>
      <Header />
      <div className='titulo'>
        <Titulo nome='Home'>
          <FcHome size={35} className='icon' />
        </Titulo>
      </div>
      <main className='mainBody'>
        <div className='pesquisa'>
          <form className='formPesquisa'>
            <label className='labelTitulo'>Titulo  </label>
            <input className='radioTitulo' type='radio' name='pesquisa' value={'titulo'} onClick={handleClick} defaultChecked />
            <label className='labelCateg'>Categoria</label>
            <input className='radioCategoria' type='radio' name='pesquisa' value={'categoria'} onClick={handleClick} /><br />
            {checkedRadio === 'titulo' ? (
              <input type='text' className='textPesquisa' placeholder='Digite o nome do produto' onChange={handlePesquisa} />)
              : (
                <select placeholder='select'  className='selectCat' value={selectCategoria} onChange={handleSelectedCateg} >
                  <option className='optionCat'  >Selecione uma opção</option>
                  <option className='optionCat'value={'educacao'}>Educação</option>
                  <option className='optionCat' value={'beleza'}>Beleza</option>
                  <option className='optionCat' value={'lazer'}>Lazer</option>
                  <option className='optionCat' value={'saude'}>Saúde</option>
                </select>
              )
            }
          </form>

        </div>
        {/* home normal */}


        {selectCategoria === '' && pesqTitulo === '' && (listProdutos.map((item, index) => {
          return (
            <div className='cardProdutos' key={index} >
              <Card className='displayCard' style={{ width: '18rem' }}>
                <Card.Img className='imgHome' variant="top" src={item.imageUrl} />
                <Card.Body>
                  <Card.Title className='tituloCard'>{item.produto}</Card.Title>
                  <Card.Text className='descricaoHome'>
                    {item.descricao.substr(0, substring)}<span role='button' onMouseOver={(e) => setSubstring(item.descricao.length)} onMouseLeave={(e) => setSubstring(47)}>...</span>
                  </Card.Text>
                  <span className='labelData'>Criado : </span><span className='textdata'> {item.cadastro}</span><br />
                  <span className='labelPreco'>Preço :</span><span className='textPreco'> R$: {item.preco}</span><br />
                  <Button variant="primary" className='btnMore' onClick={() => togglePostModal(item)}><AiOutlinePlusCircle color='#fff' size={25} /></Button>
                  <a href={item.link} target="_blank" ><Button variant="primary" className='btnComprar'><TiShoppingCart color='#fff' size={25} /></Button></a>
                </Card.Body>
              </Card>

            </div>
          )

        })
        )}

        {/* Busca por categoria */}

        {selectCategoria !== '' && (filter.map((item, index) => {
          return (
            <div className='cardProdutos' key={index} >
              <Card className='displayCard' style={{ width: '18rem' }}>
                <Card.Img className='imgHome' variant="top" src={item.imageUrl} />
                <Card.Body>
                  <Card.Title className='tituloCard'>{item.produto}</Card.Title>
                  <Card.Text className='descricaoHome'>
                    {item.descricao.substr(0, substring)}<span role='button' onMouseOver={(e) => setSubstring(item.descricao.length)} onMouseLeave={(e) => setSubstring(47)}>...</span>
                  </Card.Text>
                  <span className='labelData'>Criado : </span><span className='textdata'> {item.cadastro}</span><br />
                  <span className='labelPreco'>Preço :</span><span className='textPreco'> R$: {item.preco}</span><br />
                  <Button variant="primary" className='btnMore' onClick={() => togglePostModal(item)}><AiOutlinePlusCircle color='#fff' size={25} /></Button>
                  <a href={item.link} target='_blank' ><Button variant="primary" className='btnComprar'><TiShoppingCart color='#fff' size={25} /></Button></a>
                </Card.Body>
              </Card>

            </div>
          )
        })

        )
        }

        {/* busca por titulo */}

        {pesqTitulo !== '' && (tituloFilter.map((item, index) => {
          return (
            <div className='cardProdutos' key={item.id} >
              <Card className='displayCard' style={{ width: '18rem' }}>
                <Card.Img className='imgHome' variant="top" src={item.imageUrl} />
                <Card.Body>
                  <Card.Title className='tituloCard'>{item.produto}</Card.Title>
                  <Card.Text className='descricaoHome'>
                    {item.descricao.substr(0, substring)}<span role='button' onMouseOver={(e) => setSubstring(item.descricao.length)} onMouseLeave={(e) => setSubstring(47)}>...</span>
                  </Card.Text>
                  <span className='labelData'>Criado : </span><span className='textdata'> {item.cadastro}</span><br />
                  <span className='labelPreco'>Preço :</span><span className='textPreco'> R$: {item.preco}</span><br />
                  <Button variant="primary" className='btnMore' onClick={() => togglePostModal(item)}><AiOutlinePlusCircle color='#fff' size={25} /></Button>
                  <a href={item.link} target='_blank' ><Button variant="primary" className='btnComprar'><TiShoppingCart color='#fff' size={25} /></Button></a>
                </Card.Body>
              </Card>


            </div>



          )

        })



        )
        }
        {/* fim */}


        {mostrarModal && (
          <Modal
            conteudo={detail}
            close={togglePostModal}
          />
        )}
      </main>

    </div>
  )
}
