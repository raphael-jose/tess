// Database service using localStorage
class DBService {
  constructor() {
    this.init();
  }

  init() {
    // Initialize database collections if they don't exist
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([]));
    }
    if (!localStorage.getItem('posts')) {
      localStorage.setItem('posts', JSON.stringify([]));
    }
    if (!localStorage.getItem('comments')) {
      localStorage.setItem('comments', JSON.stringify([]));
    }
  }

  // User operations
  getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
  }

  getUserById(id) {
    const users = this.getUsers();
    return users.find(user => user.id === id);
  }

  getUserByEmail(email) {
    const users = this.getUsers();
    return users.find(user => user.email === email);
  }

  createUser(userData) {
    const users = this.getUsers();
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
      followers: [],
      following: [],
      posts: 0
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return newUser;
  }

  updateUser(id, userData) {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...userData };
      localStorage.setItem('users', JSON.stringify(users));
      return users[userIndex];
    }
    return null;
  }

  // Post operations
  getPosts() {
    return JSON.parse(localStorage.getItem('posts')) || [];
  }

  getPostsByUserId(userId) {
    const posts = this.getPosts();
    return posts.filter(post => post.userId === userId);
  }

  createPost(postData) {
    const posts = this.getPosts();
    const newPost = {
      id: Date.now().toString(),
      ...postData,
      createdAt: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      comments: 0
    };
    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));
    
    // Update user's post count
    const user = this.getUserById(postData.userId);
    if (user) {
      this.updateUser(postData.userId, { posts: user.posts + 1 });
    }
    
    return newPost;
  }

  likePost(postId, userId) {
    const posts = this.getPosts();
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
      const post = posts[postIndex];
      const likedIndex = post.likedBy.indexOf(userId);
      
      if (likedIndex === -1) {
        // Like the post
        post.likedBy.push(userId);
        post.likes = post.likedBy.length;
      } else {
        // Unlike the post
        post.likedBy.splice(likedIndex, 1);
        post.likes = post.likedBy.length;
      }
      
      posts[postIndex] = post;
      localStorage.setItem('posts', JSON.stringify(posts));
      return post;
    }
    return null;
  }

  // Comment operations
  getComments() {
    return JSON.parse(localStorage.getItem('comments')) || [];
  }

  getCommentsByPostId(postId) {
    const comments = this.getComments();
    return comments.filter(comment => comment.postId === postId);
  }

  createComment(commentData) {
    const comments = this.getComments();
    const newComment = {
      id: Date.now().toString(),
      ...commentData,
      createdAt: new Date().toISOString()
    };
    comments.push(newComment);
    localStorage.setItem('comments', JSON.stringify(comments));
    
    // Update post's comment count
    const posts = this.getPosts();
    const postIndex = posts.findIndex(post => post.id === commentData.postId);
    if (postIndex !== -1) {
      posts[postIndex].comments = comments.filter(c => c.postId === commentData.postId).length;
      localStorage.setItem('posts', JSON.stringify(posts));
    }
    
    return newComment;
  }

  // Follow operations
  followUser(followerId, followingId) {
    const follower = this.getUserById(followerId);
    const following = this.getUserById(followingId);
    
    if (follower && following) {
      // Add to follower's following list
      if (!follower.following.includes(followingId)) {
        follower.following.push(followingId);
        this.updateUser(followerId, { following: follower.following });
      }
      
      // Add to following's followers list
      if (!following.followers.includes(followerId)) {
        following.followers.push(followerId);
        this.updateUser(followingId, { followers: following.followers });
      }
      
      return true;
    }
    return false;
  }

  unfollowUser(followerId, followingId) {
    const follower = this.getUserById(followerId);
    const following = this.getUserById(followingId);
    
    if (follower && following) {
      // Remove from follower's following list
      const followingIndex = follower.following.indexOf(followingId);
      if (followingIndex !== -1) {
        follower.following.splice(followingIndex, 1);
        this.updateUser(followerId, { following: follower.following });
      }
      
      // Remove from following's followers list
      const followerIndex = following.followers.indexOf(followerId);
      if (followerIndex !== -1) {
        following.followers.splice(followerIndex, 1);
        this.updateUser(followingId, { followers: following.followers });
      }
      
      return true;
    }
    return false;
  }
}

export default new DBService();