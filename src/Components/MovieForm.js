import React from 'react';
import 'src/Components/MovieForm.css';

class MovieFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      poster: '',
      comment: '',
    };
  }

  onChange = (event) => {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  submitForm = (event) => {
    event.preventDefault();
    const url = `https://post-a-form.herokuapp.com/api/movies`;

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    };

    console.log(config.body);
    fetch(url, config)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert(res.error);
        } else {
          console.log(res);
          alert('Movie successfully added!');
          this.setState({
            title: '',
            poster: '',
            comment: '',
          });
        }
      })
      .catch((event) => {
        console.error(event);
        alert(
          'Movie not added, try again later.',
        );
      });
  };

  render() {
    return (
      <div>
        <div className="MovieFrom">
          <h1> Your Favorite Movie </h1>
          <form onSubmit={this.submitForm}>
            <fieldset className="fieldset">
              <div className="form-data">
                <label className="label-one" htmlFor="title">
                  Movie Name:  
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Movie name"
                  onChange={this.onChange}
                  value={this.state.title}
                  required
                />
              </div>

              <div className="form-data">
                <label className="label-one" htmlFor="poster">
                  Poster:  
                </label>
                <input
                  type="text"
                  id="poster"
                  name="poster"
                  placeholder="Poster url"
                  onChange={this.onChange}
                  value={this.state.poster}
                  required
                />
              </div>

              <div className="form-data">
                <div>
                  <label className="label-two" htmlFor="comment">
                    <p>Why do you like this movie?</p> 
                    <p>What made you stand out? </p>
                    <p>Leave a comment here:</p>
                  </label>
                </div>
                <div>
                  <textarea
                    rows="5"
                    cols="55"
                    className="textarea"
                    id="comment"
                    name="comment"
                    placeholder="Your comment here"
                    onChange={this.onChange}
                    value={this.state.comment}
                    required
                  />
                </div>
              </div>
              <hr />
              <div className="form-data">
                <input type="submit" value="Send" />
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default MovieFrom;