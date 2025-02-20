import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import SubredditSearch from './components/SubredditSearch';
import PostList from './components/PostList';
import FavoritesList from './components/FavoritesList';

import useRedditPosts from './hooks/useRedditPosts';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const {
    subredditPosts,
    loading,
    error,
    currentSubreddit,
    fetchSubredditPosts,
    fetchPostsByIds
  } = useRedditPosts();
  
  const [favoritePostIds, setFavoritePostIds] = useLocalStorage('favoritePostIds', []);
  const [activeTab, setActiveTab] = useState('search');

  const handleToggleFavorite = (postId) => {
    setFavoritePostIds(prevFavorites => {
      if (prevFavorites.includes(postId)) {
        return prevFavorites.filter(id => id !== postId);
      } else {
        return [...prevFavorites, postId];
      }
    });
  };

  return (
    <div className="app container py-4">
      <header className="text-center mb-4">
        <h1>Reddit Favorites App</h1>
        <p>Search for subreddits and save your favorite posts</p>
      </header>

      <div className="nav nav-tabs mb-4">
        <button 
          className={`nav-link ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          Search Subreddits
        </button>
        <button 
          className={`nav-link ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          My Favorites ({favoritePostIds.length})
        </button>
      </div>

      {activeTab === 'search' ? (
        <div className="search-tab">
          <SubredditSearch onSearch={fetchSubredditPosts} loading={loading} />
          <PostList 
            posts={subredditPosts} 
            favoritePostIds={favoritePostIds}
            onToggleFavorite={handleToggleFavorite}
            loading={loading}
            error={error}
            subreddit={currentSubreddit}
          />
        </div>
      ) : (
        <div className="favorites-tab">
          <FavoritesList 
            favoritePostIds={favoritePostIds}
            onToggleFavorite={handleToggleFavorite}
            fetchPostsByIds={fetchPostsByIds}
          />
        </div>
      )}
    </div>
  );
}

export default App;