import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';
import ScrollAnimation from '../utils/ScrollAnimation';

const FavoritesList = ({ favoritePostIds, onToggleFavorite, fetchPostsByIds }) => {
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFavorites = async () => {
      if (favoritePostIds.length === 0) {
        setFavoritePosts([]);
        return;
      }
      
      setLoading(true);
      try {
        const posts = await fetchPostsByIds(favoritePostIds);
        setFavoritePosts(posts);
        setError(null);
      } catch (err) {
        setError('Failed to load favorite posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadFavorites();
  }, [favoritePostIds, fetchPostsByIds]);

  // Show loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your favorite posts...</p>
      </div>
    );
  }

  // Show error message
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

  // Show message if no favorites exist
  if (favoritePosts.length === 0) {
    return (
      <ScrollAnimation animationClass="fade-in" className="favorites-list">
        <h3>
          <i className="bi bi-heart-fill me-2"></i>
          My Favorite Posts
        </h3>
        
        <div className="empty-state">
          <i className="bi bi-bookmark-star" style={{ fontSize: '3rem', opacity: 0.7 }}></i>
          <h4>No favorites yet</h4>
          <p>You haven't added any favorites yet. Search for a subreddit and find posts you like!</p>
          <button className="btn btn-primary" onClick={() => window.scrollTo(0, 0)}>
            <i className="bi bi-search me-2"></i>
            Search Subreddits
          </button>
        </div>
      </ScrollAnimation>
    );
  }

  // Show list of favorite posts
  return (
    <ScrollAnimation animationClass="slide-in" className="favorites-list">
      <h3>
        <i className="bi bi-heart-fill me-2"></i>
        My Favorite Posts ({favoritePosts.length})
      </h3>
      
      <div className="favorites-header">
        <p>Your favorite posts from across Reddit</p>
      </div>
      
      <div className="posts-container">
        {favoritePosts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            isFavorite={true}
            onToggleFavorite={onToggleFavorite}
            showSubreddit={true}
          />
        ))}
      </div>
    </ScrollAnimation>
  );
};

export default FavoritesList;
