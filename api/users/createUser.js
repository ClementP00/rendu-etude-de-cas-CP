// createUser.js

const mongoose = require('mongoose');
const UserModel = require('../users/users.model');

async function createDefaultUser() {
  try {
    await mongoose.connect('mongodb://localhost:27017/myapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const user = new UserModel({
      name: 'Test',
      email: 'Clement.email@example.com',
      password: 'ClementTest',
      role: 'admin',  // ou 'member' selon votre besoin
      age: 25,
    });

    await user.save();
    console.log('Utilisateur créé avec succès.');
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur :', error);
  } finally {
    mongoose.disconnect();
  }
}

createDefaultUser();
