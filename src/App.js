import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import MovieList from './pages/MovieList';
import MovieDetails from './pages/MovieDetails';
import NewMovie from './pages/NewMovie';
import EditMovie from './pages/EditMovie';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Link to="/movies/new" className="botao">ADICIONAR CARTÃO</Link>
      <Switch>
        <Route
          path="/movies/new"
          render={ (props) => <NewMovie { ...props } /> }
        />
        <Route
          path="/movies/:id/edit"
          render={ (props) => <EditMovie { ...props } /> }
        />
        <Route
          path="/movies/:id"
          render={ (props) => <MovieDetails { ...props } /> }
        />
        <Route exact path="/" component={ MovieList } />
        <Route path="/" component={ NotFound } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
