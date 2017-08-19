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
		let seasons = [], series = [];

		const seasonTableFields = `id Str NOT NULL UNIQUE, `
								+ `num Int NOT NULL, `
								+ `episode_count Int, `
								+ `years Str, `
								+ `view_count Int, `
								+ `series_ref Str NOT NULL, `
								+ `PRIMARY KEY(id)`

		const seriesTableFields = `id Str NOT NULL UNIQUE, `
								+ `name Str NOT NULL, `
								+ `season_count Int NOT NULL, `
								+ `years Str, `
								+ `active Int, `
								+ `PRIMARY KEY(id)`

		const seasonRefTableFields = `id Str NOT NULL UNIQUE, `
								   + `film_ref Str NOT NULL, `
								   + `season_ref Str NOT NULL, `
								   + `PRIMARY KEY(id)`

		// Create Tables
		db.run("DROP TABLE IF EXISTS seasons;");
		db.run("CREATE TABLE seasons ("+seasonTableFields+")");
		db.run("DROP TABLE IF EXISTS series;");
		db.run("CREATE TABLE series ("+seriesTableFields+");");
		db.run("DROP TABLE IF EXISTS season_ref;");
		db.run("CREATE TABLE season_ref ("+seasonRefTableFields+");");


		//DATABASE SEEDING

		// Seed Seasons Table
		let seaValues

		const seaColumns = `id, num, episode_count, years, view_count, series_ref`

		seasons.forEach((season) => {
			seaValues = `'${season.id}', '${season.num}', '${season.episode_count}', '${season.years}', '${season.view_count}', '${season.series_ref}'`
			db.run("INSERT INTO seasons ("+seaColumns+") VALUES ("+seaValues+");");
		});

		// Seed Series Table
		let serValues

		const serColumns = `id, name, season_count, years, active`

		series.forEach((seri) => {
			serValues = `'${seri.id}', '${seri.name}', '${seri.season_count}', '${seri.years}', '${seri.active}'`
			db.run("INSERT INTO series ("+serColumns+") VALUES ("+serValues+");");
		});

		// Seed SeasonRefs Table
		let refValues

		const refColumns = `id, film_ref, season_ref`




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
