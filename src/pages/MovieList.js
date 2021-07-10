import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import Header from '../components/Header';

import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
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
        const result = await movieAPI.getMovies();
        this.setState({
          loading: false,
          movies: result,
        });
      },
    );
  }

  render() {
    const { loading, movies } = this.state;
    if (loading) return <Loading />;
    return (
      <>
        <Header />
        <main>
          <Link to="/movies/new" className="botao-adicionar">ADICIONAR CARTÃO</Link>
          <div className="movie-list" data-testid="movie-list">
            { movies.map((movie) => <MovieCard key={ movie.title } movie={ movie } />) }
          </div>
        </main>
      </>
    );
  }
}

export default MovieList;
