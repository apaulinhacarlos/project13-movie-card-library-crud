import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import MovieForm from '../components/MovieForm';
import * as movieAPI from '../services/movieAPI';
import Loading from '../components/Loading';

class EditMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      shouldRedirect: false,
      movie: {},
    };

    /**
     * Consultei o repositório do Diogo Sant`anna para resolver essa parte do `this.mounted`
     * https://github.com/tryber/sd-012-project-movie-card-library-crud/pull/21/files#
     */
    this.mounted = false;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    if (this.mounted) {
      this.fetchApiMovies();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleSubmit(updatedMovie) {
    this.setState({
      loading: true,
    }, () => {
      this.updateMovie(updatedMovie);
    });
  }

  updateMovie(updatedMovie) {
    movieAPI.updateMovie(updatedMovie);
    this.setState({
      loading: false,
      shouldRedirect: true,
    });
  }

  async fetchApiMovies() {
    const { match: { params: { id } } } = this.props;
    const result = await movieAPI.getMovie(id);
    if (this.mounted) {
      this.setState({
        loading: false,
        movie: result,
      });
    }
  }

  render() {
    const { loading, shouldRedirect, movie } = this.state;
    if (shouldRedirect) return <Redirect to="/" />;
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
    }),
  }).isRequired,
};

export default EditMovie;
