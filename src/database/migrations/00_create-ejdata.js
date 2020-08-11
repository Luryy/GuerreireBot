const Knex =  require('knex');

exports.up = async function up (knex) {
    return knex.schema.createTable('ejdata', table =>{
        table.increments('id').primary();
        table.string('empresa').notNullable();
        table.string('emoji').notNullable();
        table.float('faturamento').defaultTo(0)
        table.float('metafat').defaultTo(0)
        table.integer('projetos').defaultTo(0)
        table.integer('metaproj').defaultTo(0)

        table.index('empresa');
    })
};


exports.down = async function down (knex) {
    return knex.schema.dropTable('ejdata');
};