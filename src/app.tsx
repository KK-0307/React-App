import React, { useState } from 'react';
import PostForm from './PostForm';
import PostList from './PostList';
import { Post } from './types';
import './index.css';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (newPost: Post) => {
    if (newPost.parentId === null) {
      setPosts([...posts, { ...newPost, votes: 0, replies: [] }]);
    } else {
      setPosts(updatePosts(posts, newPost));
    }
  };

  function updatePosts(posts: Post[], newPost: Post): Post[] {
    return posts.map(post => {
      if (post.id === newPost.parentId) {
        return { ...post, replies: [...(post.replies || []), newPost] };
      } else if (post.replies) {
        return { ...post, replies: updatePosts(post.replies, newPost) };
      }
      return post;
    });
  }

  function updateVotes(posts: Post[], id: number, delta: number): Post[] {
    return posts.map(post => {
      if (post.id === id) {
        return { ...post, votes: post.votes + delta };
      } else if (post.replies) {
        return { ...post, replies: updateVotes(post.replies, id, delta) };
      }
      return post;
    });
  }

  const handleVote = (id: number, delta: number) => {
    setPosts(updateVotes(posts, id, delta));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-4">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Kayan Corner</h1>
        <PostForm onPostSubmit={addPost} depth={0} />
        <PostList posts={posts} onReply={addPost} onVote={handleVote} />
      </div>
    </div>
  );
}

export default App;
