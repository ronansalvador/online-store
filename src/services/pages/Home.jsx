import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categorias from '../componentes/Categorias';
import Produtos from '../componentes/Produtos';
import carrinho from '../imagens/carrinho.svg';
import './Home.css';
import { getProductsFromCategoryAndQuery } from '../api';

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
    console.log(id);
    this.setState({
      categoryId: id,
    }, () => {
      // const { categoryId } = this.state;
      this.getProdutos();
    });
  }

  getQuery = () => { // ação do botão do input (value={query}) para executar a renderização dos ptodutos
    this.getProdutos();
  }

  getProdutos = async () => { // consome a função da API ppara buscar proditos de acordo com categoriaID e/ou query.
    const { categoryId, query } = this.state;
    const products = await getProductsFromCategoryAndQuery(categoryId, query);
    if (products.results.length === 0) { // caso a API retorna um array vazio -> arrayVazio: true
      this.setState({
        arrayVazio: true,
      });
    } else { // se não, armazena os produtos no estado e arrayVazio: false
      this.setState({
        arrayVazio: false,
        produtos: products.results,
      });
    }
  }

  render() {
    const { produtos, query, arrayVazio } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="InputBusca">
            <input
              data-testid="query-input"
              id="InputBusca"
              type="text"
              onChange={ this.handleInput }
              value={ query }
            />
          </label>
          <button
            data-testid="query-button"
            type="button"
            onClick={ this.getQuery }
          >
            Buscar
          </button>

        </form>

        <Link to="/carrinho" data-testid="shopping-cart-button">
          <img
            className="img-cart"
            src={ carrinho }
            alt="Imagem carrinho de compras"
          />
        </Link>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Categorias
          RecebeID={ this.getCategoryId } // passa a função getCategoryId como props (RecebeID) - para o component Categorias
        />
        {arrayVazio
          ? <p>Nenhum produto foi encontrado</p>
          : (
            <Produtos
              produtos={ produtos }
            />
          )}

      </div>
    );
  }
}

export default Home;
