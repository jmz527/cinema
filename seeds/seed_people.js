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
		let people = [
			{
				name: `cameron crowe`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `charlie kaufman`,
				sex: `m`,
				roles: `writer`,
				born: 0,
				died: null
			},
			{
				name: `christopher nolan`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `danny boyle`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `darren aronofsky`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `david fincher`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `francis ford coppola`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `gus van sant`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `john hughes`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `lars von trier`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `m. night shyamalan`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `martin scorsese`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `michael mann`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `michel gondry`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `quentin tarantino`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `rian johnson`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `richard linklater`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `robert rodriguez`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `sofia coppola`,
				sex: `f`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `spike lee`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `stanley kubrick`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `steven soderbergh`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `steven spielberg`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `terrence malick`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `terry gilliam`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			// {
			// 	name: `the coen brothers`,
			// 	sex: `m`,
			// 	roles: `director|writer`,
			// 	born: 0,
			// 	died: null
			// },
			// {
			// 	name: `the wachowski brothers`,
			// 	sex: `m`,
			// 	roles: `director|writer`,
			// 	born: 0,
			// 	died: null
			// },
			{
				name: `tim burton`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `wes anderson`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			},
			{
				name: `woody allen`,
				sex: `m`,
				roles: `director|writer`,
				born: 0,
				died: null
			}
		]


		const peopleTableFields = `id Str NOT NULL UNIQUE, `
								+ `name Str NOT NULL, `
								+ `sex Str, `
								+ `roles Str, `
								+ `born Int, `
								+ `died Int, `
								+ `PRIMARY KEY(id)`

		// const peopleRefTableFields = `id Str NOT NULL UNIQUE, `
		// 						   + `film_ref Str NOT NULL, `
		// 						   + `person_ref Str NOT NULL, `
		// 						   + `role Str NOT NULL, `
		// 						   + `PRIMARY KEY(id)`

		// Create Tables
		db.run("DROP TABLE IF EXISTS people;");
		db.run("CREATE TABLE people ("+peopleTableFields+")");
		// db.run("DROP TABLE IF EXISTS people_ref;");
		// db.run("CREATE TABLE people_ref ("+peopleRefTableFields+");");


		//DATABASE SEEDING

		// Seed People Table
		let peopleValues

		const peopleColumns = `id, name, sex, roles, born, died`

		people.forEach((person) => {
			peopleValues = `'${main_util.methods.genUUID()}', '${person.name}', '${person.sex}', '${person.roles}', '${person.born}', '${person.died}'`
			db.run("INSERT INTO people ("+peopleColumns+") VALUES ("+peopleValues+");");
		});

		// // Seed PeopleRefs Table
		// let refValues

		// const refColumns = `id, film_ref, person_ref, role`




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
