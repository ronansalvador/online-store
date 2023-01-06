import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Categorias from '../componentes/Categorias';
import Produtos from '../componentes/Produtos';
import carrinho from '../imagens/carrinho.svg';
import search from '../imagens/search.svg';
import './Home.css';
import { getProductsFromCategoryAndQuery } from '../api';
import Footer from '../componentes/Footer';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      categoryId: '',
      produtos: [],
      query: '',
      arrayVazio: false,
    };
  }

  handleInput = ({ target }) => { // função que captura o valor do input text (item buscado) e salva no estado.
    const { value } = target;
    this.setState({
      query: value,
    });
  }

  getCategoryId = (id) => { // recebe um id como parametro, salva no estado e executa a função getProdutos
    this.setState({
      categoryId: id,
    }, () => {
      // const { categoryId } = this.state;
      this.getProdutos();
    });
  }

  getQuery = (e) => { // ação do botão do input (value={query}) para executar a renderização dos ptodutos
    e.preventDefault();
    this.getProdutos();
  }

  getProdutos = async () => { // consome a função da API ppara buscar proditos de acordo com categoriaID e/ou query.
    const { categoryId, query } = this.state;
    const { setProducts } = this.props;
    const products = await getProductsFromCategoryAndQuery(categoryId, query);
    if (products.results.length === 0) { // caso a API retorna um array vazio -> arrayVazio: true
      this.setState({
        arrayVazio: true,
      });
    } else { // se não, armazena os produtos no estado e arrayVazio: false
      setProducts(products.results);
      this.setState({
        arrayVazio: false,
        produtos: products.results,
      });
    }
  }

  /*   addToCart = (id) => {
    const { produtos } = this.state;
    const addproduct = produtos.find((produto) => produto.id === id);
    console.log(addproduct);
    this.setState((prevState) => ({
      cart: [...prevState.cart, addproduct],
    }));
  } */
  // ({ target }) => console.log(target.id)

  render() {
    const { produtos, query, arrayVazio } = this.state;
    const { addToCart, cart } = this.props;
    return (
      <div>
        <div className="containerHeader">
          <h3>Online-Store</h3>
          <div className='header_div_form'>
          <form>
            <label htmlFor="InputBusca">
              <input
                data-testid="query-input"
                className="InputBusca"
                type="text"
                onChange={ (e) => this.handleInput(e) }
                value={ query }
              />
            </label>
            <button
              data-testid="query-button"
              type="submit"
              onClick={ this.getQuery }
              className="button"
            >
              <img src={search} alt='button searsh'/>
            </button>     
          </form>
              <p data-testid="home-initial-message" className="message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
          </div>
          <div className="cartBtn">

            <Link to="/carrinho" data-testid="shopping-cart-button">
              <img
                className="img-cart"
                src={ carrinho }
                alt="Imagem carrinho de compras"
              />
            </Link>
            { (cart.length > 0) ? <p data-testid="shopping-cart-size" className="length">{ cart.length }</p> : "" }
          </div>
        </div>
      
        <main>
          <Categorias
            RecebeID={ this.getCategoryId }
          />
          {arrayVazio
            ? <p>Nenhum produto foi encontrado</p>
            : (
              <Produtos
                produtos={ produtos }
                addToCart={ addToCart }
              />
            )}
        </main>
        <Footer />

      </div>
    );
  }
}

Home.propTypes = {
  addToCart: PropTypes.func.isRequired,
  setProducts: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Home;
