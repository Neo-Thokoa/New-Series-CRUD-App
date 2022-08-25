import React, { Component } from "react";
import MovieDataService from "../services/movie.service";

import { styles } from "../css-common"
import { TextField, Button, withStyles } from "@material-ui/core";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getMovie = this.getMovie.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateMovie = this.updateMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);

    this.state = {
      currentMovie: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getMovie(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMovie: {
          ...prevState.currentMovie,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentMovie: {
        ...prevState.currentMovie,
        description: description
      }
    }));
  }

  getMovie(id) {
    MovieDataService.get(id)
      .then(response => {
        this.setState({
          currentMovie: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentMovie.id,
      title: this.state.currentMovie.title,
      description: this.state.currentMovie.description,
      published: status
    };

    MovieDataService.update(this.state.currentMovie.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentMovie: {
            ...prevState.currentMovie,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateMovie() {
    MovieDataService.update(
      this.state.currentMovie.id,
      this.state.currentMovie
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The movie was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteMovie() {    
    MovieDataService.delete(this.state.currentMovie.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/movies')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentMovie } = this.state;
    const { classes } = this.props;

    return (
      <div>
        {currentMovie ? (
          <div className={classes.form}>
            <h4>Film</h4>
            <form>
              <div className="form-group">
                {/* <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentMovie.title}
                  onChange={this.onChangeTitle}
                /> */}
                <TextField
                  className={classes.textField}
                  label="Title"
                  name="title"
                  value={currentMovie.title}
                  onChange={this.onChangeTitle}
                  required
                />
              </div>
              <div className="form-group">
                {/* <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentMovie.description}
                  onChange={this.onChangeDescription}
                /> */}
                <TextField
                  className={classes.textField}
                  label="Description"
                  name="description"
                  value={currentMovie.description}
                  onChange={this.onChangeDescription}
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentMovie.published ? "Published" : "Pending"}
              </div>
            </form>

            <div className={classes.buttonWrapper}>
              {currentMovie.published ? (
                // <button
                //   className="badge badge-primary mr-2"
                //   onClick={() => this.updatePublished(false)}
                // >
                //   UnPublish
                // </button>
                <Button
                  className={`${classes.publish} ${classes.button}`}
                  onClick={() => this.updatePublished(false)}
                >
                  UnPublish
                </Button>
              ) : (
                // <button
                //   className="badge badge-primary mr-2"
                //   onClick={() => this.updatePublished(true)}
                // >
                //   Publish
                // </button>
                <Button
                  className={`${classes.publish} ${classes.button}`}
                  onClick={() => this.updatePublished(true)}
                >
                  Publish
                </Button>
              )}

              {/* <button
                className="badge badge-danger mr-2"
                onClick={this.deleteMovie}
              >
                Delete
              </button> */}
              <Button
                className={`${classes.delete} ${classes.button}`}
                onClick={this.deleteMovie}
              >
                Delete
              </Button>
              <Button
                type="submit"
                className={`${classes.update} ${classes.button}`}
                onClick={this.updateMovie}
              >
                  Update
              </Button>
              {/* <button
                type="submit"
                className="badge badge-success"
                onClick={this.updateMovie}
              >
                Update
              </button> */}
            </div>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Movie...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Movie)