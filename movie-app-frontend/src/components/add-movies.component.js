import React, { Component } from "react";
import MovieDataService from "../services/movie.service";

import { TextField, Button, withStyles } from "@material-ui/core"
import { styles } from "../css-common"

class AddMovie extends Component {

  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.newMovie = this.newMovie.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      published: false,

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveMovie() {
    var data = {
      title: this.state.title,
      description: this.state.description
    };

    MovieDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newMovie() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,

      submitted: false
    });
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        {this.state.submitted ? (
          <div className={classes.form}>
            <h4>You submitted successfully!</h4>
            {/* <button className="btn btn-success" onClick={this.newMovie}>
              Add
            </button> */}
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={this.newMovie}>
              Add
            </Button>
          </div>
        ) : (
          <div className={classes.form}>
            <div className={classes.textField}>
              {/* <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              /> */}
              <TextField
                label="Title"
                name="title"
                value={this.state.title}
                onChange={this.onChangeTitle}
                required
              />
            </div>

            <div className={classes.textField}>
              {/* <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              /> */}
              <TextField
                label="Description"
                name="description"
                value={this.state.description}
                onChange={this.onChangeDescription}
                required
              />              
            </div>

            {/* <button onClick={this.saveMovie} className="btn btn-success">
              Submit
            </button> */}
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={this.saveMovie}>
              Submit
            </Button>            
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AddMovie)