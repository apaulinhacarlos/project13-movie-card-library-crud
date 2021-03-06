import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as movieAPI from '../services/movieAPI';
import Loading from '../components/Loading';

class MovieDetails extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      movies: [],
    };
  }

  componentDidMount() {
    this.fetchApiMovies();
  }

  async fetchApiMovies() {
    this.setState(
      { loading: true },
      async () => {
        const { match: { params: { id } } } = this.props;
        const result = await movieAPI.getMovie(id);
        this.setState({
          loading: false,
          movies: result,
        });
      },
    );
  }

  render() {
    const { loading, movies } = this.state;
    const { title, storyline, imagePath, genre, rating, subtitle, id } = movies;
    if (loading) return <Loading />;
    return (
      <>
        <h2 className="page-title-h2">Detalhes do Filme</h2>
        <div data-testid="movie-details" className="movie-card-details">
          <img
            alt="Movie Cover"
            src={ `../${imagePath}` }
            className="movie-card-image"
          />
          <h4 className="movie-card-title">{ title }</h4>
          <p className="movie-card-p">{ `Subtitle: ${subtitle}` }</p>
          <p className="movie-card-p">{ `Storyline: ${storyline}` }</p>
          <p className="movie-card-p">{ `Genre: ${genre}` }</p>
          <p className="movie-card-p">{ `Rating: ${rating}` }</p>
          <span className="editar-voltar">
            <Link
              to={ `/movies/${id}/edit` }
              className="botao-editar-voltar"
            >
              EDITAR
            </Link>
            <Link to="/" className="botao-editar-voltar">VOLTAR</Link>
            <Link
              to="/"
              className="botao-editar-voltar"
              onClick={ () => movieAPI.deleteMovie(id) }
            >
              DELETAR
            </Link>
          </span>
        </div>
      </>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MovieDetails;
