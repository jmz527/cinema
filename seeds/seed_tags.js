const sqlite3 = require('sqlite3').verbose()
const fs = require("fs")
const db = new sqlite3.Database('cinema.db')
const jsonFile = process.argv[2]

function genUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
}


if (fs.existsSync(jsonFile)) {
	let tree = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

	//DATA PROCESSING

	//PRE-SEED ROUTINE

	//DATABASE TABLE CREATION
	db.serialize(() => {
		let tags = []

		const tagTableFields = `id Str NOT NULL UNIQUE, `
							 + `name Str NOT NULL, `
							 + `film_count Int, `
							 + `PRIMARY KEY(id)`

		const tagRefTableFields = `id Str NOT NULL UNIQUE, `
								+ `film_ref Str NOT NULL, `
								+ `tag_ref Str NOT NULL, `
								+ `tag_type Str NOT NULL, `
								+ `PRIMARY KEY(id)`

		// Create Tables
		db.run("DROP TABLE IF EXISTS tags;");
		db.run("CREATE TABLE tags ("+tagTableFields+")");
		db.run("DROP TABLE IF EXISTS tag_ref;");
		db.run("CREATE TABLE tag_ref ("+tagRefTableFields+");");


		//DATABASE SEEDING

		// Seed People Table
		let tagValues

		const tagColumns = `id, name, film_count`

		tags.forEach((tag) => {
			tagValues = `'${tag.id}', '${tag.name}', '${tag.film_count}'`
			db.run("INSERT INTO tags ("+tagColumns+") VALUES ("+tagValues+");");
		});

		// Seed TagRefs Table
		let refValues

		const refColumns = `id, film_ref, tag_ref, tag_type`


	});
	db.close();

	// Log Results
	console.log('Finished DB Seed!')
	// console.log(users.length + ' users');
	// console.log(assets.length + ' assets');
	// console.log(points.length + ' points');

} else if(!fs.existsSync(jsonFile)) {
	console.error('ERROR: ./test.json missing.');
	// console.error('Please re-install from git repo.');
}
