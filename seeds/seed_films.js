const sqlite3 = require('sqlite3').verbose()
const fs = require("fs")
const db = new sqlite3.Database('cinema.db')

function genUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
}


if (fs.existsSync('./test.json')) {
	let tree = JSON.parse(fs.readFileSync('./test.json', 'utf8'));

	//DATA PROCESSING

	//PRE-SEED ROUTINE













	//DATABASE SEEDING
	db.serialize(() => {
		let films = [];

		const filmTableFields = `id Str NOT NULL UNIQUE, `
							  + `name Str NOT NULL, `
							  + `abs_path Str NOT NULL, `
							  + `rel_path Str NOT NULL, `
							  + `ext Str NOT NULL, `
							  + `size Int, `
							  + `dur Int, `
							  + `kind Str, `
							  + `view_count Int, `
							  + `ls_time DATETIME DEFAULT CURRENT_TIMESTAMP, `
							  + `a_time DATETIME, `
							  + `m_time DATETIME, `
							  + `c_time DATETIME, `
							  + `b_time DATETIME, `
							  + `PRIMARY KEY(id)`

		// Create Tables
		db.run(`DROP TABLE IF EXISTS films;`);
		db.run(`CREATE TABLE films (${filmTableFields})`);


		// Seed Films Table
		let fValues

		const fColumns = `id, name, abs_path, rel_path, ext, size, dur, kind, view_count, ls_time, a_time, m_time, c_time, b_time`

		// let id, name, abs_path, rel_path, ext, size, dur, kind, view_count, ls_time, a_time, m_time, c_time, b_time

		films.forEach((film) => {
			fValues = `'${film.id}', '${film.name}', '${film.abs_path}', '${film.rel_path}', '${film.ext}', '${film.size}', '${film.dur}', '${film.kind}', '${film.view_count}', '${film.ls_time}', '${film.a_time}', '${film.m_time}', '${film.c_time}', '${film.b_time}'`
			db.run("INSERT INTO films ("+fColumns+") VALUES ("+fValues+");");
		});

	});
	db.close();

	// Log Results
	console.log('Finished DB Seed!')
	// console.log(users.length + ' users');
	// console.log(assets.length + ' assets');
	// console.log(points.length + ' points');

} else if(!fs.existsSync('./test.json')) {
	console.error('ERROR: ./test.json missing.');
	// console.error('Please re-install from git repo.');
}
