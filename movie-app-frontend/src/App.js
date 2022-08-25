import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { styles } from "./css-common";

import AddMovie from "./components/add-movies.component";
import Movie from "./components/movie.component";
import MoviesList from "./components/movies-list.component";

import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';

class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        {/* <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/movies"} className="navbar-brand">
            Movie CRUD App
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/movies"} className="nav-link">
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Film
              </Link>
            </li>
          </div>
        </nav> */}

        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <Typography className={classes.name} variant="h6">
            Movie CRUD App
            </Typography>
            <Link to={"/movies"} className={classes.link}>
              <Typography variant="body2">
                View Movies List
              </Typography>
            </Link>
            <Link to={"/add"} className={classes.link}>
              <Typography variant="body2">
              Add Film
            </Typography>
            </Link>
          </Toolbar>
        </AppBar>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/movies"]} component={MoviesList} />
            <Route exact path="/add" component={AddMovie} />
            <Route path="/movies/:id" component={Movie} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
