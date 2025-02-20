import axios from 'axios';

const BASE_URL = 'https://www.reddit.com';
const axiosInstance = axios.create({
  headers: {
    'User-Agent': 'web:RedditFavorites:v1.0 (by /Honest_Advance6207)'
  }
});

export const fetchSubredditPosts = async (subreddit) => {
  try {
    const response = await axiosInstance.get(
      `${BASE_URL}/r/${subreddit}/hot.json?limit=10`
    );
    return response.data.data.children.map(child => child.data);
  } catch (error) {
    console.error('Error fetching subreddit posts:', error);
    throw error;
  }
};

export const fetchPostById = async (postId) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/by_id/t3_${postId}.json`);
    return response.data.data.children[0].data;
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    throw error;
  }
};
