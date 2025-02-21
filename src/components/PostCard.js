import React from 'react';
import ScrollAnimation from '../utils/ScrollAnimation';

const PostCard = ({ post, isFavorite, onToggleFavorite, showSubreddit = false }) => {
  const postId = post.id;
  const permalink = `https://www.reddit.com${post.permalink}`;
  const hasImage = post.thumbnail && post.thumbnail.startsWith('http');
  const upvotePercentage = post.upvote_ratio ? Math.round(post.upvote_ratio * 100) : null;

  // Format numbers with K/M suffix
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };

  // Get time ago from timestamp
  const getTimeAgo = (createdUtc) => {
    const seconds = Math.floor((new Date() - new Date(createdUtc * 1000)) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return interval + (interval === 1 ? " year ago" : " years ago");

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return interval + (interval === 1 ? " month ago" : " months ago");

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + (interval === 1 ? " day ago" : " days ago");

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + (interval === 1 ? " hour ago" : " hours ago");

    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + (interval === 1 ? " minute ago" : " minutes ago");

    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <ScrollAnimation animationClass="fade-in" className="post-card hover-lift">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div className="post-content">
            {showSubreddit && (
              <small className="subreddit-tag">
                <i className="bi bi-reddit"></i> r/{post.subreddit}
              </small>
            )}

            <h5 className="card-title">
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                {post.title}
              </a>
            </h5>

            <div className="post-meta">
              <span className="post-author">Posted by u/{post.author}</span>
              <span className="post-time">{getTimeAgo(post.created_utc)}</span>
            </div>

            {hasImage && (
              <div className="post-thumbnail mt-2">
                <img 
                  src={post.thumbnail} 
                  alt={post.title} 
                  className="rounded"
                  width={post.thumbnail_width || 120}
                  height={post.thumbnail_height || 80}
                />
              </div>
            )}

            <div className="post-details">
              <span className="badge bg-secondary">
                <i className="bi bi-arrow-up-circle-fill"></i> {formatNumber(post.score)}
              </span>

              <a href={permalink} target="_blank" rel="noopener noreferrer">
                <i className="bi bi-chat-left-text-fill"></i> {formatNumber(post.num_comments)} comments
              </a>

              {upvotePercentage && (
                <span className="upvote-percentage">
                  <i className="bi bi-graph-up"></i> {upvotePercentage}% upvoted
                </span>
              )}
            </div>
          </div>

          <div className="favorite-action">
            <button 
              className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-primary'}`}
              onClick={() => onToggleFavorite(postId)}
            >
              {isFavorite ? (
                <>
                  <i className="bi bi-heart-fill me-1"></i> Remove
                </>
              ) : (
                <>
                  <i className="bi bi-heart me-1"></i> Favorite
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
};

export default PostCard;
