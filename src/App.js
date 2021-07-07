import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
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
      <Route exact path="/" component={ MovieList } />
      <Route
        path="/movies/:id"
        render={ (props) => <MovieDetails { ...props } /> }
      />
      <Route
        path="/movies/:id/edit"
        render={ (props) => <EditMovie { ...props } /> }
      />
      <Route path="/movies/new" component={ NewMovie } />
      <Route exact path="" component={ NotFound } />
    </BrowserRouter>
  );
}

export default App;
