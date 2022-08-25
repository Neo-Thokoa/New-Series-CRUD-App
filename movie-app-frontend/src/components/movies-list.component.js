import React, { Component } from "react";
import MovieDataService from "../services/movie.service";
import { Link } from "react-router-dom";

import { styles } from "../css-common"
import { TextField, Button, Grid, ListItem, withStyles } from "@material-ui/core";

class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveMovies = this.retrieveMovies.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMovie = this.setActiveMovie.bind(this);
    this.removeAllMovies = this.removeAllMovies.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      movies: [],
      currentMovie: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveMovies();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveMovies() {
    MovieDataService.getAll()
      .then(response => {
        this.setState({
          movies: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveMovies();
    this.setState({
      currentMovie: null,
      currentIndex: -1
    });
  }

  setActiveMovie(movie, index) {
    this.setState({
      currentMovie: movie,
      currentIndex: index
    });
  }

  removeAllMovies() {
    MovieDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentMovie: null,
      currentIndex: -1
    });

    MovieDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          movies: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { classes } = this.props;
    const { searchTitle, movies, currentMovie, currentIndex } = this.state;

    return (
      <div className={classes.form}>
        <Grid container>
          <Grid className={classes.search} item sm={12} xs={12} md={12} xl={12} lg={12}>
            <TextField
                label="Search by title"
                value={searchTitle}
                onChange={this.onChangeSearchTitle}
              />
            <Button
              size="small"
              variant="outlined"
              className={classes.textField}
              onClick={this.searchTitle}>
              Search
            </Button>  
          </Grid>
          {/* <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={searchTitle}
                onChange={this.onChangeSearchTitle}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.searchTitle}
                >
                  Search
                </button>
              </div>
            </div>
          </div> */}

          <Grid item md={4}>
            <h2>Film List</h2>

            <div className="list-group">
        
              {movies &&
                movies.map((movie, index) => (
                  <ListItem
                    selected={index === currentIndex}
                    onClick={() => this.setActiveMovie(movie, index)}
                    divider
                    button	
                    key={index}>
                    {movie.title}
                  </ListItem>
                ))}
            </div>

            <Button
              className={`${classes.button} ${classes.removeAll}`}
              size="small"
              color="secondary"
              variant="contained"
              onClick={this.removeAllMovies}
            >
              Remove All
            </Button>
          </Grid>

          {/* <div className="col-md-6">
            <h4>Film List</h4>

            <ul className="list-group">
              {movies &&
                movies.map((movie, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveMovie(movie, index)}
                    key={index}
                  >
                    {movie.title}
                  </li>
                ))}
            </ul>

            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={this.removeAllMovies}
            >
              Remove All
            </button>
          </div> */}
          <Grid item md={8}>
            {currentMovie ? (
              <div className={classes.movies}>
                <h4>Film</h4>
                <div className={classes.detail}>
                  <label>
                    <strong>Title:</strong>
                  </label>{" "}
                  {currentMovie.title}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Description:</strong>
                  </label>{" "}
                  {currentMovie.description}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentMovie.published ? "Published" : "Pending"}
                </div>

                <Link
                  to={"/movies/" + currentMovie.id}
                  className={classes.edit}
                >
                  Edit
                </Link>
              </div>
            ) : (
              <div>
                <br />
                <p className={classes.movies}>Please click on a Film...</p>
              </div>
            )}
          </Grid>
        </Grid>
        
      </div>
    );
  }
}

export default withStyles(styles)(MoviesList)