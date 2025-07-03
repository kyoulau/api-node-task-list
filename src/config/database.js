// configração com BD
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'laura',
  database: 'task-list',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

