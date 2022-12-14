/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('art_works', function(t){
        t.increments('id').primary();
        t.string('title', 150);
        t.string('artist', 150);
        t.integer('year');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    knex.schema.dropTableIfExists('art_works');

};
