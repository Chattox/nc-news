exports.up = function(knex) {
  console.log('creating users table...');
  return knex.schema.createTable('users', userTable => {
    userTable.string('username').primary();
    userTable.string('avatar_url');
    userTable.string('name');
  });
};

exports.down = function(knex) {
  console.log('removing users table...');
  return knex.schema.dropTable('users');
};
