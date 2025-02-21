import React from 'react';
import PostCard from './PostCard';
import ScrollAnimation from '../utils/ScrollAnimation';

const PostList = ({ posts, favoritePostIds, onToggleFavorite, loading, error, subreddit }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading the best posts from r/{subreddit}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <ScrollAnimation animationClass="fade-in">
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      </ScrollAnimation>
    );
  }

  // Show a message if no posts are found in the subreddit
  if (posts.length === 0 && subreddit) {
    return (
      <ScrollAnimation animationClass="fade-in">
        <div className="alert alert-info">
          <i className="bi bi-info-circle-fill me-2"></i>
          No posts found in r/{subreddit}. Try another subreddit!
        </div>
      </ScrollAnimation>
    );
  }

  // If no posts exist at all, don't render anything
  if (posts.length === 0) {
    return null;
  }

  return (
    <ScrollAnimation animationClass="slide-in" className="post-list">
      <div className="subreddit-header">
        <h3>
          <i className="bi bi-reddit me-2"></i>
          Top Posts from r/{subreddit}
        </h3>
        <div className="subreddit-stats">
          <span>{posts.length} posts</span>
        </div>
      </div>
      
      <div className="posts-container">
        {posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            isFavorite={favoritePostIds.includes(post.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </ScrollAnimation>
  );
};

export default PostList;
