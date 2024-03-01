// types.ts
export interface Post {
    id: number;
    name: string;
    text: string;
    parentId: number | null;
    depth: number;
    votes: number;
    replies?: Post[];
  }
  
  export interface PostProps {
    post: Post;
    onReply: (reply: Post) => void;
    onVote: (id: number, delta: number) => void;
  }
  
  export interface PostListProps {
    posts: Post[];
    onReply: (reply: Post) => void;
    onVote: (id: number, delta: number) => void;
  }
  