const mongoose = require('mongoose');
const state = { db: null };

module.exports.connect = () => {
  const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );

  mongoose
    .connect(DB)
    .then(() => console.log('database connected'));
};


module.exports.get = () => {
  return state.db;
};
