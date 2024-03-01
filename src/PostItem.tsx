import React, { useState } from 'react';
import PostForm from './PostForm';
import { Post, PostProps } from './types';

interface PostItemProps extends PostProps {
  onVote: (id: number, delta: number) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onReply, onVote }) => {
  const [replies, setReplies] = useState<Post[]>(post.replies || []);
  const [isReplying, setIsReplying] = useState(false);

  const handleReply = (reply: Post) => {
    const newReply = { ...reply, replies: [] };
    setReplies([...replies, newReply]);
    onReply(newReply);
    setIsReplying(false);
  };

  const handleVote = (delta: number) => {
    onVote(post.id, delta);
  };

  return (
    <div className={`post-item ${post.depth > 0 ? 'ml-4' : ''} mb-4 bg-white rounded-lg shadow p-4`}>
      <div className="flex items-start">
        <div className="voting-buttons mr-2">
          <button onClick={() => handleVote(1)} className="text-lg font-bold mr-2">&#9650;</button>
          <span className="text-lg">{post.votes}</span>
          <button onClick={() => handleVote(-1)} className="text-lg font-bold ml-2">&#9660;</button>
        </div>
        <div className="flex-1">
          <div className="post-header mb-2">
            <span className="font-semibold">{post.name}</span>
          </div>
          <p>{post.text}</p>
          <button onClick={() => setIsReplying(!isReplying)} className="reply-button mt-2 text-blue-500">Reply</button>
          {isReplying && <PostForm onPostSubmit={handleReply} parentId={post.id} depth={post.depth + 1} />}
        </div>
      </div>
      <div className="replies mt-4">
        {replies.map((reply) => (
          <PostItem key={reply.id} post={reply} onReply={onReply} onVote={onVote} />
        ))}
      </div>
    </div>
  );
};

export default PostItem;
