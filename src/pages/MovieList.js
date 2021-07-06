import React, { Component } from 'react';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      movies: [],
    };

    console.log(movieAPI.getMovies());
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
    // Render Loading here if the request is still happening

    return (
      <div data-testid="movie-list">
        { loading
          ? <Loading />
          : movies.map((movie) => <MovieCard key={ movie.title } movie={ movie } />) }
      </div>
    );
  }
}

export default MovieList;
