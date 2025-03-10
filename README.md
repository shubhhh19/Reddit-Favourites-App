# Reddit Favorites App

A React application that allows users to search for posts in any subreddit and save their favorite posts locally using the Web Storage API.
Check the website out here: https://reddit-favorites-app.netlify.app/

## Features

- **Subreddit Search**: Enter any subreddit name to fetch and display its top 10 "hot" posts
- **Post Details**: View each post's score, title, and link to the comments page
- **Favorites Management**: Add posts to your favorites list with a single click
- **Cross-Subreddit Favorites**: View all your favorite posts from different subreddits in one place
- **Local Storage Persistence**: Your favorite posts are saved in your browser and persist between sessions
- **Responsive Design**: Fully responsive UI that works on mobile and desktop devices
- **Popular Subreddits**: Quick access to popular subreddits with one-click search

## Installation and Run Instructions

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Dependencies
- React (v18.2.0)
- Bootstrap (v5.2.3)
- Bootstrap Icons (v1.10.3)

### Installation Steps

1. Clone the Repository
2. Install the dependencies: `npm install`
3. Start the development server: `npm start`
4. Open your browser and go to `http://localhost:3000`



## Interesting Parts during the Build Process

### Reddit API Integration
The app interacts with Reddit's JSON API directly without requiring authentication for public content. This was implemented by creating a service layer (redditApi.js) that handles all API requests, making the rest of the app more maintainable.

### Local Storage Implementation
One of the key requirements was to store only post IDs in localStorage rather than the entire post data. This was achieved through a custom hook (useLocalStorage.js) that manages saving and retrieving data from the browser's localStorage.

### Component Reusability
The PostCard component is used in both the subreddit search results and the favorites list. It adapts to different contexts by accepting props like showSubreddit to display the subreddit name when viewing favorites from multiple subreddits.


## Difficulties Faced and Solutions

### Challenge: Reddit API Rate Limiting

**Problem**: The Reddit API has rate limits that can cause request failures when making too many requests.

**Solution**: Implemented proper error handling and user feedback for API failures. Added loading states to prevent users from making multiple requests simultaneously.

### Challenge: Preserving State Between Sessions

**Problem**: Ensuring favorite posts persist between browser sessions without a backend.

**Solution**: Used the Web Storage API (localStorage) to save post IDs, then re-fetched post data from the Reddit API when needed. This approach ensured we only stored the minimum necessary data (IDs) while still providing the full post information.

### Challenge: Managing Component Dependencies

**Problem**: Creating clean component hierarchies with proper data flow.

**Solution**: Utilized custom hooks to separate data fetching and state management logic from UI components. This made the components more focused on rendering and improved maintainability.

### Challenge: UI Responsiveness with Dynamic Content

**Problem**: Creating a responsive UI that handles varying content lengths from Reddit posts.

**Solution**: Implemented flexible layouts with Bootstrap that adapt to different screen sizes and content lengths. Used CSS to ensure consistent appearance regardless of post title length or content.

