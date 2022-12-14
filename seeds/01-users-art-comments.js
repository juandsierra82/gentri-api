/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    { name: 'Lola', location: 'Miami', age: 23}
  ]);
  await knex('art_works').del();
  await knex('art_works').insert([
    {title: 'Mona Lisa', artist: 'DaVinci', year: 1500 }
  ])
  await knex('comments').del();
  await knex('comments').insert([
    {art_id: 1, user_id: 1, content: 'AWESOME!'}
  ])
};
