import React, { useState, useEffect } from 'react';
import dbService from '../services/dbService';
import '../App.css';

const Feed = ({ currentUser, setCurrentPage }) => {
  const [posts, setPosts] = useState([]);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [comments, setComments] = useState({});

  // Load posts and comments from database
  useEffect(() => {
    loadPostsAndComments();
  }, []);

  const loadPostsAndComments = () => {
    // Get all posts and sort by creation date (newest first)
    const allPosts = dbService.getPosts();
    const sortedPosts = allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Get comments for each post
    const commentsData = {};
    sortedPosts.forEach(post => {
      commentsData[post.id] = dbService.getCommentsByPostId(post.id);
    });
    
    setPosts(sortedPosts);
    setComments(commentsData);
  };

  const handleLike = (postId) => {
    // Toggle like in database
    dbService.likePost(postId, currentUser.id);
    
    // Reload posts to reflect changes
    loadPostsAndComments();
  };

  const handleCreatePost = () => {
    if (newPostContent.trim() === '') {
      alert('Por favor, escreva algo antes de postar.');
      return;
    }

    // Create post in database
    const newPost = dbService.createPost({
      userId: currentUser.id,
      username: currentUser.name,
      content: newPostContent,
      userAvatar: currentUser.name.charAt(0)
    });

    setNewPostContent('');
    setShowCreatePostModal(false);
    
    // Reload posts to reflect changes
    loadPostsAndComments();
  };

  const handleAddComment = (postId, commentContent) => {
    if (commentContent.trim() === '') return;

    // Create comment in database
    const newComment = dbService.createComment({
      postId: postId,
      userId: currentUser.id,
      username: currentUser.name,
      content: commentContent,
      userAvatar: currentUser.name.charAt(0)
    });

    // Reload posts and comments to reflect changes
    loadPostsAndComments();
  };

  // Get user's friends (for stories and suggestions)
  const getFriends = () => {
    const allUsers = dbService.getUsers();
    return allUsers.filter(user => user.id !== currentUser.id).slice(0, 5);
  };

  // Get trending hashtags (simplified for demo)
  const getTrending = () => {
    return [
      { id: 1, hashtag: '#cyberpunk', posts: '12.5K posts' },
      { id: 2, hashtag: '#tech', posts: '8.2K posts' },
      { id: 3, hashtag: '#future', posts: '5.7K posts' },
      { id: 4, hashtag: '#hacker', posts: '3.1K posts' },
      { id: 5, hashtag: '#neon', posts: '2.8K posts' },
    ];
  };

  // Get friend suggestions
  const getFriendSuggestions = () => {
    const allUsers = dbService.getUsers();
    return allUsers.filter(user => 
      user.id !== currentUser.id && 
      !currentUser.following?.includes(user.id)
    ).slice(0, 3);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'agora';
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else {
      return `${Math.floor(diffInHours / 24)}d`;
    }
  };

  // Sample stories data
  const stories = [
    { id: 1, username: 'Seu Story', isOwn: true },
    ...getFriends().map((user, index) => ({
      id: index + 2,
      username: user.name,
      isOwn: false
    }))
  ];

  // Sample trending data
  const trending = getTrending();

  // Sample friend suggestions
  const friendSuggestions = getFriendSuggestions();

  return (
    <div className="App">
      {/* Efeitos visuais futuristas */}
      <div className="scanlines"></div>
      <div className="crt-effect"></div>
      <div className="cyber-grid"></div>
      <div className="cyber-circle cyber-circle-1"></div>
      <div className="cyber-circle cyber-circle-2"></div>
      <div className="hologram hologram-1"></div>
      <div className="hologram hologram-2"></div>
      
      <div className="feed-layout">
        <div className="main-feed">
          <div className="feed-header">
            <h1 className="app-title glitch-text" data-text="TESS">TESS</h1>
            <button className="App-button" onClick={() => setShowCreatePostModal(true)}>
              Criar Post
            </button>
          </div>

          {/* Stories section */}
          <div className="story-section">
            <div className="story-container">
              {stories.map(story => (
                <div key={story.id} className="story-item">
                  <div className="story-avatar">
                    {story.isOwn && <div className="story-plus">+</div>}
                    <span>{story.isOwn ? currentUser.name.charAt(0) : story.username.charAt(0)}</span>
                  </div>
                  <div className="story-username">{story.username}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Criar post rápido */}
          <div className="create-post-card">
            <div className="create-post-header">
              <div className="user-avatar-small">{currentUser.name.charAt(0)}</div>
              <input
                type="text"
                placeholder="No que você está pensando?"
                className="create-post-input"
                onClick={() => setShowCreatePostModal(true)}
              />
            </div>
            <div className="create-post-actions">
              <button className="action-button">
                📷 Foto/Vídeo
              </button>
              <button className="action-button">
                😄 Sentimento
              </button>
            </div>
          </div>

          {/* Lista de posts */}
          {posts.length > 0 ? (
            posts.map(post => {
              // Get user data for the post
              const postUser = dbService.getUserById(post.userId);
              
              return (
                <div key={post.id} className="post-card">
                  <div className="post-header">
                    <div className="user-avatar">{post.userAvatar || post.username.charAt(0)}</div>
                    <div className="post-user-info">
                      <h3 className="post-username">{post.username}</h3>
                      <p className="post-time">{formatDate(post.createdAt)}</p>
                    </div>
                  </div>
                  <div className="post-content">
                    {post.content}
                  </div>
                  <div className="post-actions">
                    <button 
                      className={`action-button ${post.likedBy?.includes(currentUser.id) ? 'liked' : ''}`}
                      onClick={() => handleLike(post.id)}
                    >
                      {post.likedBy?.includes(currentUser.id) ? '❤️' : '🤍'} Curtir
                      <span className="action-count">{post.likes}</span>
                    </button>
                    <button className="action-button">
                      💬 Comentar
                      <span className="action-count">{post.comments}</span>
                    </button>
                    <button className="action-button">
                      ↗️ Compartilhar
                    </button>
                  </div>
                  
                  {/* Seção de comentários */}
                  <div className="comment-section">
                    {comments[post.id] && comments[post.id].map(comment => (
                      <div key={comment.id} className="comment">
                        <div className="comment-avatar">{comment.userAvatar || comment.username.charAt(0)}</div>
                        <div className="comment-content">
                          <span className="comment-username">{comment.username}</span>
                          {comment.content}
                        </div>
                      </div>
                    ))}
                    
                    <div className="add-comment">
                      <input
                        type="text"
                        placeholder="Escreva um comentário..."
                        className="add-comment-input"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddComment(post.id, e.target.value);
                            e.target.value = '';
                          }
                        }}
                      />
                      <button 
                        className="add-comment-button"
                        onClick={(e) => {
                          const input = e.target.previousElementSibling;
                          handleAddComment(post.id, input.value);
                          input.value = '';
                        }}
                      >
                        Enviar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="post-card">
              <p>Nenhum post encontrado. Seja o primeiro a postar algo!</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Trending section */}
          <div className="trending-section">
            <h2 className="trending-title">Trending</h2>
            {trending.map((item, index) => (
              <div key={item.id} className="trending-item">
                <div className="trending-number">{index + 1}</div>
                <div className="trending-content">
                  <p className="trending-hashtag">{item.hashtag}</p>
                  <p className="trending-posts">{item.posts}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Suggested friends */}
          <div className="suggested-friends">
            <h2 className="suggested-title">Sugestões para você</h2>
            {friendSuggestions.map(friend => (
              <div key={friend.id} className="friend-suggestion">
                <div className="friend-avatar">{friend.name.charAt(0)}</div>
                <div className="friend-info">
                  <h3 className="friend-name">{friend.name}</h3>
                  <p className="friend-mutual">{friend.followers?.length || 0} seguidores</p>
                </div>
                <div className="friend-actions">
                  <button className="friend-follow">Seguir</button>
                  <button className="friend-remove">×</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal para criar post */}
      {showCreatePostModal && (
        <div className="modal-overlay" onClick={() => setShowCreatePostModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Criar Post</h2>
              <button 
                className="modal-close" 
                onClick={() => setShowCreatePostModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="create-post-header">
                <div className="user-avatar">{currentUser.name.charAt(0)}</div>
                <h3 className="post-username">{currentUser.name}</h3>
              </div>
              <textarea
                className="modal-textarea"
                placeholder="No que você está pensando?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button 
                className="App-button cancel-button"
                onClick={() => setShowCreatePostModal(false)}
              >
                Cancelar
              </button>
              <button 
                className="App-button"
                onClick={handleCreatePost}
              >
                Postar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navegação */}
      <div className="App-nav">
        <button className="App-button" onClick={() => setCurrentPage('home')}>🏠 Início</button>
        <button className="App-button" onClick={() => setCurrentPage('profile')}>👤 Perfil</button>
        <button className="App-button" onClick={() => setCurrentPage('settings')}>⚙️ Configurações</button>
        <button 
          className="App-button" 
          onClick={() => setCurrentPage('login')}
        >
          🔒 Sair
        </button>
      </div>
    </div>
  );
};

export default Feed;