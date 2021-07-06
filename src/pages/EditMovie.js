import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import MovieForm from '../components/MovieForm';
import * as movieAPI from '../services/movieAPI';
import Loading from '../components/Loading';
import MovieCard from '../components/MovieCard';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      // status: 'loading',
      shouldRedirect: false,
      movie: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchApiMovies();
  }

  componentDidUpdate() {
    const { movie } = this.state;
    console.log(movie);
    // return (
    //   <div className="movie-list" data-testid="movie-list">
    //     { movie.map((mov) => <MovieCard key={ mov.title } movie={ mov } />) }
    //   </div>
    // );
  }

  handleSubmit(updatedMovie) {
    this.setState({
      shouldRedirect: true,
      movie: updatedMovie,
    });
  }

  async fetchApiMovies() {
    this.setState(
      { loading: true },
      async () => {
        const { match: { params: { id } } } = this.props;
        const result = await movieAPI.getMovie(id);
        this.setState({
          loading: false,
          // shouldRedirect: false,
          movie: result,
        });
      },
    );
  }

  render() {
    const { loading, shouldRedirect, movie } = this.state;
    if (shouldRedirect) return <Redirect to="/" />;

    // if (loading === 'true') {
    //   return <Loading />;
    // }

    if (loading) return <Loading />;

    return (
      <div data-testid="edit-movie">
        <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}

EditMovie.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default EditMovie;
