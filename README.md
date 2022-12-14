# API

## Usage

Install nodejs per nvmrc file and global install yarn

Install knex js globally then

`knex migrate:latest`

This should migrate the database.

Then

`knex seed:run`

Should populate the db with one sample row for each table.

To run, simply run

`node index.js`

This should run the application.

