import { Component } from 'react';

import '../../styles/global-styles.css'

import { Posts } from '../../Posts' 
import { loadPosts } from '../../../utils/load-posts';
import { Button } from '../../Button';
import { TextInput } from '../../TextInput';


export class Home extends Component {
    state = {
           posts:[],
           allPost:[],
           page: 0,
           postPerPage: 2,
           searchValue: ''
           
    };
    
    async componentDidMount(){
      await this.loadPosts();
    }

    loadPosts = async () =>{
      const { page, postPerPage } = this.state;
      const postsAndPhotos = await loadPosts();
      this.setState({
        posts: postsAndPhotos.slice(page, postPerPage),
        allPosts: postsAndPhotos,
      });
      
    }
      
    loadMorePosts = () =>{
      const{
        page,
        postPerPage,
        allPosts,
        posts
      } = this.state;
      const nextPage = page + postPerPage;
      const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);
      posts.push(...nextPosts);

      this.setState({posts, page: nextPage});

    }



    handleChange = (e) => {
      const {value} = e.target;
      this.state({ searchValue: value});

    }




  render(){
    const {posts, page, postPerPage, allPosts, searchValue} = this.state;
    const noMorePosts = page + postPerPage >= <allPosts className="length"></allPosts>;

    const filteredPosts = !!searchValue ? 
    allPosts.filter(post =>{
      return post.title.toLowerCase().includes(
        searchValue.toLocaleLowerCase()
      );
    }) 
    : posts;
    
    return (
      <section className = "container">
        <div class = "search-container">
          {!!searchValue && (
            <h1>Search Value: {searchValue}</h1>
          )}
         
          <TextInput searchValue={searchValue} handleChange={this.handleChange}/>
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
          )}

        {filteredPosts.length === 0 && (
          <p>Não Existem Posts = (</p> 
          )}

        <div className="button-container">
        {!searchValue &&(
          <Button 
          text="Load more posts"
          onClick={this.loadMorePosts}
          disabled={noMorePosts}
          />

        )}
        </div>
      </section>
    );
   }

  }



/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Olá Mundo! Paz!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */


