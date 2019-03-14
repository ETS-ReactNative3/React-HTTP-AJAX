import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

import axios from 'axios';

class Blog extends Component {

  state = {
    posts: [],
    selectedPostId: null,
    error: false
  };

  // fetching http data has side effects
  // so use componentDidMount
  // you cannot store the get request in a variable, since it is asynchronous
  // promises are the best way to handle that - default JS ES6
  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/postssss")
      .then(response =>{
        // fetch all but store only 4
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            // distribute the property of post
            // add a new property called author
            ...post,
            author: 'Nik'
          }
        });
        this.setState({posts: updatedPosts});
      })
      .catch(error => {
        this.setState({error: true})
      });

  };

  postSelectedHandler(id){
    this.setState({selectedPostId: id});
  }



    render () {
      let posts = <p style={{textAlign: 'center'}}>Something went wrong..!</p>;
      if (!this.state.error) {
        // Array of jsx elements and map each post
         posts = this.state.posts.map(post => {
          return <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}/>
        });
      }

      return (
          <div>
              <section className="Posts">
                {posts}
              </section>
              <section>
                  <FullPost id={this.state.selectedPostId}/>
              </section>
              <section>
                  <NewPost />
              </section>
          </div>
      );
    }
}

export default Blog;