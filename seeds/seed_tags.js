const fs = require("fs")
const sqlite3 = require('sqlite3').verbose()
const main_util = require('../util/main_util')

const db = new sqlite3.Database('cinema.db')
const jsonFile = process.argv[2]


if (fs.existsSync(jsonFile)) {
	let tree = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

	//DATA PROCESSING

	//PRE-SEED ROUTINE

	//DATABASE TABLE CREATION
	db.serialize(() => {
		let tags = [`tv`, `travel`, `trailers`, `stand-up`, `news`, `music video`, `kung fu`, `anime`, `documentary`, `action`, `classic`, `comedy`, `drama`, `fantasy`, `thrillers`, `horror`, `foreign`, `indie`, `pixar`, `romcom`, `scifi`, `shorts`]

		const tagTableFields = `id Str NOT NULL UNIQUE, `
							 + `name Str NOT NULL, `
							 + `film_count Int, `
							 + `PRIMARY KEY(id)`

		// const tagRefTableFields = `id Str NOT NULL UNIQUE, `
		// 						+ `film_ref Str NOT NULL, `
		// 						+ `tag_ref Str NOT NULL, `
		// 						+ `tag_type Str NOT NULL, `
		// 						+ `PRIMARY KEY(id)`

		// Create Tables
		db.run("DROP TABLE IF EXISTS tags;");
		db.run("CREATE TABLE tags ("+tagTableFields+")");
		// db.run("DROP TABLE IF EXISTS tag_ref;");
		// db.run("CREATE TABLE tag_ref ("+tagRefTableFields+");");


		//DATABASE SEEDING

		// Seed People Table
		let tagValues

		const tagColumns = `id, name, film_count`

		tags.forEach((tag) => {
			tagValues = `'${main_util.methods.genUUID()}', '${tag}', '${0}'`
			db.run("INSERT INTO tags ("+tagColumns+") VALUES ("+tagValues+");");
		});

		// // Seed TagRefs Table
		// let refValues

		// const refColumns = `id, film_ref, tag_ref, tag_type`


	});
	db.close();

	// Log Results
	console.log('Finished DB Seed!')
	console.log(tags.length + ' tags');

} else if(!fs.existsSync(jsonFile)) {
	console.error('ERROR: ./test.json missing.');
	// console.error('Please re-install from git repo.');
}
