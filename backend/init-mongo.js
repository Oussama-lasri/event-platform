// MongoDB initialization script
db = db.getSiblingDB('event-platform');

// Create admin user for the application
db.createUser({
  user: 'admin',
  pwd: 'password123',
  roles: [
    {
      role: 'readWrite',
      db: 'event-platform'
    }
  ]
});

// Create collections
db.createCollection('users');
db.createCollection('events');
db.createCollection('categories');
db.createCollection('registrations');

// Create indexes
db.users.createIndex({ "email": 1 }, { unique: true });
db.events.createIndex({ "title": 1 });
db.events.createIndex({ "date": 1 });
db.events.createIndex({ "categoryId": 1 });
db.categories.createIndex({ "name": 1 }, { unique: true });
db.registrations.createIndex({ "userId": 1 });
db.registrations.createIndex({ "eventId": 1 });
db.registrations.createIndex({ "userId": 1, "eventId": 1 }, { unique: true });

print('Database initialized successfully');