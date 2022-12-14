/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('comments', function(t){
        t.increments('id').primary();
        t.integer('user_id').references('id').inTable('users').onDelete('CASCADE').unsigned();
        t.integer('art_id').unsigned().notNullable();
        t.foreign('art_id').references('id').inTable('art_works').onDelete('CASCADE');
        t.text('content').notNullable();
        t.string('name', 150);
        t.index(['art_id'], 'idx_art_id');
        t.index(['user_id'], 'idx_user_id')
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    knex.schema.dropTableIfExists('comments');

};
