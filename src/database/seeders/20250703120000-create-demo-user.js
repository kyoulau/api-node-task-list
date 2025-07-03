'use strict';

// Em uma aplicação real, você usaria uma biblioteca como bcryptjs para criar o hash da senha.
// const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        email: 'john.doesilva@example.com',
        // A senha '123456' seria transformada em um hash.
        // Ex: password_hash: await bcrypt.hash('123456', 8),
        password_hash: '$2a$08$AbCdEfGhIjKlMnOpQrStU.e1gH2iJ3kL4mN5oP6qR7sT8uV9wX0yZ',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Jane Smith',
        email: 'jane.smithsilva@example.com',
        password_hash: '$2a$08$BcDeFgHiJkLmNoPqRsTuV.f2hI3jK4lM5nO6pQ7rS8tU9vW0xY1z.',
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        name: 'Alice Johnson',
        email: 'alice.j@example.com',
        password_hash: '$2a$08$dummyhashplaceholder1',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Bob Williams',
        email: 'bob.w@example.com',
        password_hash: '$2a$08$dummyhashplaceholder2',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Charlie Brown',
        email: 'charlie.b@example.com',
        password_hash: '$2a$08$dummyhashplaceholder3',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Diana Miller',
        email: 'diana.m@example.com',
        password_hash: '$2a$08$dummyhashplaceholder4',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Ethan Davis',
        email: 'ethan.d@example.com',
        password_hash: '$2a$08$dummyhashplaceholder5',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Fiona Garcia',
        email: 'fiona.g@example.com',
        password_hash: '$2a$08$dummyhashplaceholder6',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'George Rodriguez',
        email: 'george.r@example.com',
        password_hash: '$2a$08$dummyhashplaceholder7',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Hannah Wilson',
        email: 'hannah.w@example.com',
        password_hash: '$2a$08$dummyhashplaceholder8',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Ian Martinez',
        email: 'ian.m@example.com',
        password_hash: '$2a$08$dummyhashplaceholder9',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Julia Anderson',
        email: 'julia.a@example.com',
        password_hash: '$2a$08$dummyhashplaceholder10',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const { Op } = Sequelize;
    return queryInterface.bulkDelete('users', {
      email: {
        [Op.in]: [
          'john.doe@example.com',
          'jane.smith@example.com',
          'alice.j@example.com',
          'bob.w@example.com',
          'charlie.b@example.com',
          'diana.m@example.com',
          'ethan.d@example.com',
          'fiona.g@example.com',
          'george.r@example.com',
          'hannah.w@example.com',
          'ian.m@example.com',
          'julia.a@example.com'
        ]
      }
    }, {});
  }
};