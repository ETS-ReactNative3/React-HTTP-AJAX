import React, { Component } from 'react';

import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null,
  };


  componentDidUpdate() {
    // do only for valid id
    if (this.props.id) {
      // setState inside componentDidMount will render component and call componentDidMount infinitely
      // stop by checking it the id is different for the post || post is loaded but id is different
      if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)){
      //make a http request for single post to load the data inside Full post
        axios.get("posts/" + this.props.id)
        // you cannot store asynchronous response inside a variable,
        // use promises i.e then block
          .then(response => {
            this.setState({loadedPost: response.data})
        })
      }
    }
  }

    deletePostHandler = () => {
      axios.delete("posts/" + this.props.id)
        .then(response => {
          console.log(response);
        })
    };


  render () {
    let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
    if (this.props.id) {
      post = <p style={{textAlign: 'center'}}>Loading....please wait!</p>
    }
      // after you get the id you immediately load title and body
      // remember its an asynchronous request, takes time to loadPost...
      // check if its valid loadedPost
      if (this.state.loadedPost) {
        post = (
          <div className="FullPost">
            <h1>{this.state.loadedPost.title}</h1>
            <p>{this.state.loadedPost.body}</p>
            <div className="Edit">
              <button onClick={this.deletePostHandler}>Delete</button>
            </div>
          </div>
      )};
    return post;
    }
}

export default FullPost;