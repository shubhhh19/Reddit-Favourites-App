import { useState, useEffect } from 'react';
import { getSubredditPosts, getPostsByIds } from '../services/redditApi';

// Custom hook for fetching and managing Reddit posts
function useRedditPosts() {
  const [subredditPosts, setSubredditPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentSubreddit, setCurrentSubreddit] = useState('');

  // Fetch posts from a specified subreddit
  const fetchSubredditPosts = async (subreddit) => {
    if (!subreddit.trim()) return;
    
    setLoading(true);
    setError(null);
    setCurrentSubreddit(subreddit);
    
    try {
      const posts = await getSubredditPosts(subreddit);
      setSubredditPosts(posts);
    } catch (err) {
      setError(`Failed to fetch posts from r/${subreddit}: ${err.message}`);
      setSubredditPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch multiple posts by their IDs
  const fetchPostsByIds = async (postIds) => {
    if (!postIds.length) return [];
    
    try {
      return await getPostsByIds(postIds);
    } catch (err) {
      console.error('Error fetching favorite posts:', err);
      return [];
    }
  };

  return {
    subredditPosts,
    loading,
    error,
    currentSubreddit,
    fetchSubredditPosts,
    fetchPostsByIds
  };
}

export default useRedditPosts;