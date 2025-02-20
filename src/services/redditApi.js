// Reddit API services
const BASE_URL = 'https://www.reddit.com';

// Get hot posts from a subreddit
export const getSubredditPosts = async (subreddit, limit = 10) => {
  try {
    // Use the JSON API to get the hot posts
    const response = await fetch(`${BASE_URL}/r/${subreddit}/hot.json?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching subreddit: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.data.children.map(post => post.data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Get details for a single post by ID
export const getPostById = async (postId) => {
  try {
    // Remove t3_ prefix if present
    const cleanId = postId.startsWith('t3_') ? postId.substring(3) : postId;
    
    const response = await fetch(`${BASE_URL}/by_id/t3_${cleanId}.json`);
    
    if (!response.ok) {
      throw new Error(`Error fetching post: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.data.children[0].data;
  } catch (error) {
    console.error('Error fetching post details:', error);
    throw error;
  }
};

// Get details for multiple posts by their IDs
export const getPostsByIds = async (postIds) => {
  if (!postIds.length) return [];
  
  try {
    // Format the IDs list for the API (comma-separated full IDs)
    const formattedIds = postIds.map(id => {
      return id.startsWith('t3_') ? id : `t3_${id}`;
    }).join(',');
    
    const response = await fetch(`${BASE_URL}/by_id/${formattedIds}.json`);
    
    if (!response.ok) {
      throw new Error(`Error fetching posts: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.data.children.map(post => post.data);
  } catch (error) {
    console.error('Error fetching posts details:', error);
    throw error;
  }
};