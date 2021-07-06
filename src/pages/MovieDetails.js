import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        console.log(result);
        this.setState({
          loading: false,
          movies: result,
        });
      },
    );
  }

  render() {
    // Change the condition to check the state
    // if (true) return <Loading />;

    const { loading, movies } = this.state;
    const { title, storyline, imagePath, genre, rating, subtitle } = movies;

    return (
      <div data-testid="movie-details" className="movie-list">
        { loading
          ? <Loading />
          : <div className="movie-card">
            <img
              alt="Movie Cover"
              src={ `../${imagePath}` }
              className="movie-card-image"
            />
            <h4 className="movie-card-title">{ title }</h4>
            <p className="movie-card-storyline">{ subtitle }</p>
            <p className="movie-card-storyline">{ `Storyline: ${storyline}` }</p>
            <p className="movie-card-storyline">{ `Genre: ${genre}` }</p>
            <span className="rating">{ `Rating: ${rating}`}</span>
          </div> }
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MovieDetails;
