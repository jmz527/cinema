const fs = require("fs")
const path = require(`path`)
const sqlite3 = require(`sqlite3`).verbose()
const main_util = require('../util/main_util')

const db = new sqlite3.Database(`cinema.db`)
const jsonFile = process.argv[2] || `./deep_trailers_map.json`

// TODO: Account for film series

if (fs.existsSync(jsonFile)) {
	let tree, films = []
	let id, name, abs_path, rel_path, ext, size, dur, kind, view_count, ls_time, a_time, m_time, c_time, b_time

	//DATA PROCESSING
	tree = JSON.parse(fs.readFileSync(jsonFile, `utf8`)) // console.log(tree)

	//PRE-SEED ROUTINE
	mainLoop(tree.data, films) // console.log(films)

	function mainLoop(thisDir, arr) {
		// If dirs prop, files prop both exist, and both are not null
		if (thisDir.hasOwnProperty(`dirs`) && thisDir[`dirs`] != null && thisDir.hasOwnProperty(`files`) && thisDir[`files`] != null) {
			// loop again
			for (dir in thisDir.dirs) mainLoop(thisDir.dirs[dir], arr)
			// loop over the files
			fileLoop(thisDir, arr)
		// If dirs, but no files
		} else if (thisDir.hasOwnProperty(`dirs`) && thisDir[`dirs`] != null && (!thisDir.hasOwnProperty(`files`) || thisDir[`files`] == null)) {
			// loop again
			for (dir in thisDir.dirs) mainLoop(thisDir.dirs[dir], arr)
		// If files, but no dirs
		} else if (thisDir.hasOwnProperty(`files`) && thisDir[`files`] != null && (!thisDir.hasOwnProperty(`dirs`) || thisDir[`dirs`] == null)) {
			// loop over the files
			fileLoop(thisDir, arr)
		// If neither files nor dirs
		} else if (thisDir.hasOwnProperty(`dirs`) && thisDir[`dirs`] == null && thisDir.hasOwnProperty(`files`) && thisDir[`files`] == null) {
			// Check if it's the root thisDir
			if (thisDir==tree.rootDir) console.log(`ERROR: EMPTY ROOT DIR (${thisDir})`)
		// If else, something went wrong
		} else { console.log(`ERROR: UNMAPPED DIR (${thisDir})`) }

		return arr
	}


	function fileLoop(thisDir, arr) {

		thisDir.files.forEach((file) => {

			// console.log(`//==================================//`)
			// console.log(file)
			// console.log(`//==================================//`)
			// console.log({
			// 	relPath: thisDir.fileStats[file].relPath,
			// 	stats: thisDir.fileStats[file].stats,
			// 	meta: thisDir.fileStats[file].meta
			// })

			id = main_util.genUUID()
			name = thisDir.fileStats[file].meta.kMDItemDisplayName
			abs_path = thisDir.fileStats[file].relPath
			rel_path = null
			ext = path.extname(thisDir.fileStats[file].relPath)
			size = thisDir.fileStats[file].stats.size
			dur = thisDir.fileStats[file].meta.kMDItemDurationSeconds
			kind = thisDir.fileStats[file].meta.kMDItemKind
			view_count = 0
			ls_time = Date.now()
			a_time = thisDir.fileStats[file].stats.atimeMs
			m_time = thisDir.fileStats[file].stats.mtimeMs
			c_time = thisDir.fileStats[file].stats.ctimeMs
			b_time = thisDir.fileStats[file].stats.birthtimeMs

			arr.push({ id, name, abs_path, rel_path, ext, size, dur, kind, view_count, ls_time, a_time, m_time, c_time, b_time })

		})

		return arr
	}

	//DATABASE SEEDING
	db.serialize(() => {

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

		films.forEach((film) => {
			fValues = `'${film.id}', '${film.name}', '${film.abs_path}', '${film.rel_path}', '${film.ext}', '${film.size}', '${film.dur}',`
					+` '${film.kind}', '${film.view_count}', '${film.ls_time}', '${film.a_time}', '${film.m_time}', '${film.c_time}', '${film.b_time}'`

			db.run(`INSERT INTO films (${fColumns}) VALUES (${fValues});`)
		})

	})
	db.close()

	// Log Results
	console.log(`Finished DB Seed!`)
	console.log(films.length + ' films');

} else if(!fs.existsSync(jsonFile)) {
	console.error(`ERROR: ${jsonFile} missing.`);
	// console.error('Please re-install from git repo.');
}
