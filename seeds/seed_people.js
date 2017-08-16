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
		let people = []

		const peopleTableFields = `id Str NOT NULL UNIQUE, `
								+ `name Str NOT NULL, `
								+ `sex Str, `
								+ `roles Str, `
								+ `born Int, `
								+ `died Int, `
								+ `PRIMARY KEY(id)`

		const peopleRefTableFields = `id Str NOT NULL UNIQUE, `
								   + `film_ref Str NOT NULL, `
								   + `person_ref Str NOT NULL, `
								   + `role Str NOT NULL, `
								   + `PRIMARY KEY(id)`

		// Create Tables
		db.run("DROP TABLE IF EXISTS people;");
		db.run("CREATE TABLE people ("+peopleTableFields+")");
		db.run("DROP TABLE IF EXISTS people_ref;");
		db.run("CREATE TABLE people_ref ("+peopleRefTableFields+");");


		//DATABASE SEEDING

		// Seed People Table
		let peopleValues

		const peopleColumns = `id, name, sex, roles, born, died`

		people.forEach((person) => {
			peopleValues = `'${person.id}', '${person.name}', '${person.sex}', '${person.roles}', '${person.born}', '${person.died}'`
			db.run("INSERT INTO people ("+peopleColumns+") VALUES ("+peopleValues+");");
		});

		// Seed PeopleRefs Table
		let refValues

		const refColumns = `id, film_ref, person_ref, role`




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
