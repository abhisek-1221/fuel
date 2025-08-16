const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function clearTestUsers() {
  try {
    console.log('Clearing all test users...');
    
    const result = await prisma.user.deleteMany({});
    
    console.log(`Deleted ${result.count} users from the database`);
    
  } catch (error) {
    console.error('Error clearing users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function createTestUser() {
  try {
    console.log('Creating test user...');
    
    const testUser = await prisma.user.create({
      data: {
        clerkUserId: 'test-user-' + Date.now(),
        age: 25,
        gender: 'male',
        accent: 'American English',
        nativeLanguage: 'English',
        location: 'United States',
        totalPoints: 0,
      },
    });
    
    console.log('Test user created:', testUser);
    
  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run if called directly
if (require.main === module) {
  clearTestUsers();
}

module.exports = clearTestUsers;
