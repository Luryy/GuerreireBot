const Knex =  require('knex');

exports.up = async function up (knex) {
    return knex.schema.createTable('mail', table =>{
        table.increments('id').primary();
        table.string('chatId').notNullable();
        table.string('role').notNullable();
        table.string('type').notNullable();
        table.string('nome').notNullable();

        table.string('empresa').notNullable()
            .references('empresa')
            .inTable('ejdata')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })
};

exports.down = async function down (knex) {
    return knex.schema.dropTable('mail');
};