import React, { useState } from 'react';

interface Post {
  title: string;
  description: string;
  userId: string;
}

const Write: React.FC = () => {
  const [post, setPost] = useState<Post>({
    title: '',
    description: '',
    userId: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        console.log('Post submitted successfully');
      } else {
        console.error('Failed to submit post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPost({
      ...post,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={post.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={post.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="userId">userId:</label>
        <input
          type="text"
          id="userId"
          value={post.userId}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Write;
