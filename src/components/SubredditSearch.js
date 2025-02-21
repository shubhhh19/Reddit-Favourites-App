import React, { useState } from 'react';
import ScrollAnimation from '../utils/ScrollAnimation';

const popularSubreddits = [
  'funny', 'AskReddit', 'gaming', 'aww', 'pics', 
  'science', 'worldnews', 'movies', 'todayilearned', 'programming'
];

const SubredditSearch = ({ onSearch, loading }) => {
  const [subreddit, setSubreddit] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (subreddit.trim()) {
      onSearch(subreddit.trim());
    }
  };
  
  const handleSuggestionClick = (suggestion) => {
    setSubreddit(suggestion);
    onSearch(suggestion);
  };
  
  return (
    <ScrollAnimation animationClass="fade-in">
      <div className="subreddit-search">
        <h2>
          <i className="bi bi-search me-2"></i>
          Find Posts from Any Subreddit
        </h2>
        
        {/* Search input */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              value={subreddit}
              onChange={(e) => setSubreddit(e.target.value)}
              placeholder="Enter subreddit name (e.g. 'reactjs')"
              disabled={loading}
              className="form-control"
              aria-label="Subreddit name"
            />
            <button 
              type="submit" 
              disabled={loading || !subreddit.trim()} 
              className="search-btn"
            >
              {loading ? (
                <span>
                  <i className="bi bi-hourglass-split me-2"></i>
                  Loading...
                </span>
              ) : (
                <span>
                  <i className="bi bi-search me-2"></i>
                  Search
                </span>
              )}
            </button>
          </div>
        </form>
        
        {/* Popular subreddit suggestion */}
        <div className="popular-subreddits">
          <h6>Popular Subreddits:</h6>
          <div className="subreddit-tags">
            {popularSubreddits.map(sub => (
              <button
                key={sub}
                className="subreddit-tag"
                onClick={() => handleSuggestionClick(sub)}
                disabled={loading}
              >
                r/{sub}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
};

export default SubredditSearch;
