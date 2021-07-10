import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';

import MovieForm from '../components/MovieForm';
import * as movieAPI from '../services/movieAPI';

class NewMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      shouldRedirect: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(newMovie) {
    this.setState({
      loading: true,
    }, () => this.createMovie(newMovie));
  }

  async createMovie(newMovie) {
    await movieAPI.createMovie(newMovie);
    this.setState({
      loading: false,
      shouldRedirect: true,
    });
  }

  render() {
    const { loading, shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to="/" />;
    if (loading) return <Loading />;
    return (
      <div data-testid="new-movie" className="div-add-movie">
        <h2 className="page-title-h2"> Adicione um Novo Filme </h2>
        <MovieForm onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}

export default NewMovie;
