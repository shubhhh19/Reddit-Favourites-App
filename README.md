# Reddit Favorites App

A React application that allows users to search for Reddit posts by subreddit and save their favorite posts using the Web Storage API.

## Features

- Search for posts from any subreddit
- View the top 10 "hot" posts from a subreddit
- Save posts to your favorites list
- View all your favorite posts across subreddits
- Remove posts from your favorites list
- Favorites are saved in your browser using localStorage

## Installation

1. Clone the repository:
```
git clone https://github.com/your-github-username/reddit-favorites.git
cd reddit-favorites
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Deployment Instructions

### GitHub Pages

1. Update the `homepage` field in `package.json` to point to your GitHub Pages URL:
```json
"homepage": "https://your-github-username.github.io/reddit-favorites"
```

2. Install the `gh-pages` package as a dev dependency:
```
npm install --save-dev gh-pages
```

3. Add deployment scripts to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build",
  ...
}
```

4. Deploy to GitHub Pages:
```
npm run deploy
```

### Netlify

1. Create a `netlify.toml` file in the project root:
```toml
[build]
  command = "npm run build"
  publish = "build"
```

2. Deploy to Netlify using their CLI or connect the repo on their website.

## Technologies Used

- React
- Web Storage API
- Reddit JSON API
- Bootstrap CSS Framework