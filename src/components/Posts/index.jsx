import { PostCard } from "../PostCard";

import './styles.css'

export const Posts = ({posts}) => (
    <div className="posts">
        {posts.map(post =>(
          <PostCard 
            key = {post.id}
            title = {post.title}
            post = {post.body}
            id = {post.id}
            cover = {post.cover}
          />
        
        ))}
      </div>


);