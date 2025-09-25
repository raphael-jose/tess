import dbService from './dbService';

// Function to create initial demo data
export const seedDatabase = () => {
  // Check if data already exists
  const users = dbService.getUsers();
  if (users.length > 0) {
    return; // Data already exists
  }

  // Create demo users
  const demoUsers = [
    {
      name: 'Alex Cyber',
      email: 'alex@example.com',
      password: 'password123'
    },
    {
      name: 'Sam Tech',
      email: 'sam@example.com',
      password: 'password123'
    },
    {
      name: 'Jordan Future',
      email: 'jordan@example.com',
      password: 'password123'
    },
    {
      name: 'Taylor Neon',
      email: 'taylor@example.com',
      password: 'password123'
    }
  ];

  // Add users to database
  const createdUsers = demoUsers.map(userData => 
    dbService.createUser(userData)
  );

  // Create demo posts
  const demoPosts = [
    {
      userId: createdUsers[0].id,
      username: createdUsers[0].name,
      content: 'Explorando as possibilidades do futuro digital! #cyberpunk #tech',
      userAvatar: createdUsers[0].name.charAt(0)
    },
    {
      userId: createdUsers[1].id,
      username: createdUsers[1].name,
      content: 'Nova atualização da Tess está incrível! A interface ficou muito mais futurista.',
      userAvatar: createdUsers[1].name.charAt(0)
    },
    {
      userId: createdUsers[2].id,
      username: createdUsers[2].name,
      content: 'Trabalhando remotamente do metrô enquanto a cidade dorme... #remote #cyberlife',
      userAvatar: createdUsers[2].name.charAt(0)
    }
  ];

  // Add posts to database
  demoPosts.forEach(postData => {
    dbService.createPost(postData);
  });

  // Create demo comments
  const demoComments = [
    {
      postId: demoPosts[0].id,
      userId: createdUsers[1].id,
      username: createdUsers[1].name,
      content: 'Incrível! Concordo totalmente.',
      userAvatar: createdUsers[1].name.charAt(0)
    },
    {
      postId: demoPosts[0].id,
      userId: createdUsers[2].id,
      username: createdUsers[2].name,
      content: 'Isso é o futuro que queremos!',
      userAvatar: createdUsers[2].name.charAt(0)
    },
    {
      postId: demoPosts[1].id,
      userId: createdUsers[0].id,
      username: createdUsers[0].name,
      content: 'Design top! Parabéns pelo trabalho.',
      userAvatar: createdUsers[0].name.charAt(0)
    }
  ];

  // Add comments to database
  demoComments.forEach(commentData => {
    dbService.createComment(commentData);
  });

  console.log('Demo data seeded successfully!');
};

// Run seed function
seedDatabase();