const BASE_URL = 'https://www.reddit.com';

export const getSubredditPosts = async (subreddit, limit = 10) => {
  try {
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

export const getPostById = async (postId) => {
  try {
    const cleanId = postId.startsWith('t3_') ? postId.substring(3) : postId; // Remove t3_ if needed
    
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

export const getPostsByIds = async (postIds) => {
  if (!postIds.length) return [];
  
  try {
    const formattedIds = postIds.map(id => id.startsWith('t3_') ? id : `t3_${id}`).join(','); // Format IDs
    
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
