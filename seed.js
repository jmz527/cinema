const sqlite3 = require('sqlite3').verbose()
const fs = require("fs")
const db = new sqlite3.Database('cinema.db')

function genUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
}


if (fs.existsSync('seeds/test.json')) {
	let tree = JSON.parse(fs.readFileSync('seeds/test.json', 'utf8'));

	//DATA PROCESSING

	//PRE-SEED ROUTINE

	//DATABASE SEEDING
	db.serialize(() => {
		let 



	// var uTableFields, aTableFields, pTableFields;
	//     uTableFields = "ID Str NOT NULL UNIQUE, email Str NOT NULL, name Str NOT NULL, pw Str NOT NULL UNIQUE"
	//       +", clientRef Str, updatedTS DATETIME, createdTS DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(ID)";
	//     aTableFields = "ID Str NOT NULL UNIQUE, parentId Str, name Str NOT NULL, acceptsNewPoints Int, collectData Int"
	//       +", hasPoints Int, hasChildren Int, createdTS DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(ID)";
	//     pTableFields = "key Str NOT NULL UNIQUE, assetKey Str NOT NULL, name Str NOT NULL, label Str, scaling Int, tags Str"
	//       +", isWeakRef Int, hasWeakRefs Int, weakRefUrls Str, originalUrl Str, compression Int, compressionValue Int"
	//       +", compressionUnit Str, stepByStep Int, ruleViolationFlagging Int, inboundScalingFactor Int, description Str"
	//       +", uom Str, unitClass Str, value Int, clonePointUserKey Str, clonePointAssetKey Str, createdTS DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(key)";

	// // Create Tables
	// db.run("DROP TABLE IF EXISTS users;");
	// db.run("CREATE TABLE users ("+uTableFields+")");
	// db.run("DROP TABLE IF EXISTS assets;");
	// db.run("CREATE TABLE assets ("+aTableFields+");");
	// db.run("DROP TABLE IF EXISTS points;");
	// db.run("CREATE TABLE points ("+pTableFields+");");

	// // Seed Users Table
	// var uValues, salt, hash, splitEmail, cRef, count = 0;
	// const uColumns = "ID, email, name, pw, clientRef, updatedTS", saltRounds = 10, pw = 'password';

	// users.forEach(function(user) {
	   //  salt = bcrypt.genSaltSync(saltRounds),
	//   hash = bcrypt.hashSync(pw, salt),
	//   splitEmail = user.email.split('@');
	//   cRef = (count<17)?"07a2a8fd-4c92-480d-99ce-0e9b0107ce10":"";
	//   uValues = "'"+genUUID()+"', '"+splitEmail[0]+'[@'+splitEmail[1]+']'+"', '"+user.name+"', '"+hash+"', '"+cRef+"', CURRENT_TIMESTAMP";

			// db.run("INSERT INTO users ("+uColumns+") VALUES ("+uValues+");");

	//   count++;
	// });

	// // Seed Assets Table
	// var aColumns, aValues;
	//     aColumns = "ID, parentId, name, acceptsNewPoints, collectData, hasPoints, hasChildren";

	// assets.forEach(function(asset) {
	//   aValues = "'"+asset.id+"', '"+asset.parentId+"', '"+asset.name+"', "+asset.acceptsNewPoints+", "+asset.collectData+", "+asset.hasPoints+", "+asset.hasChildren;
	//   db.run("INSERT INTO assets ("+aColumns+") VALUES ("+aValues+");");
	// });

	// // Seed Points Table
	// var pColumns, pValues;
	//     pColumns = "key, assetKey, name, description, label, scaling, isWeakRef, hasWeakRefs, originalUrl"
	//       +", compression, compressionValue, compressionUnit, stepByStep, ruleViolationFlagging, inboundScalingFactor"
	//       +", uom, unitClass, value, weakRefUrls, tags, clonePointUserKey, clonePointAssetKey";

	// points.forEach(function(point) {
	//   pValues = "'"+point.key+"', '"+point.assetKey+"', '"+point.name+"', '"+point.description+"', '"+point.label+"', "+point.scaling
	//       +", "+point.isWeakRef+", "+point.hasWeakRefs+", '"+point.originalUrl+"', "+point.compression+", "+point.compressionValue+", '"+point.compressionUnit
	//       +"', "+point.stepByStep+", "+point.ruleViolationFlagging+", "+point.inboundScalingFactor+", '"+point.uom+"', '"+point.unitClass+"', "+point.value
	//       +", '"+point.weakRefUrls+"', '"+point.tags+"', '"+point.clonePointUserKey+"', '"+point.clonePointAssetKey+"'";
	//   db.run("INSERT INTO points ("+pColumns+") VALUES ("+pValues+");");
	// });





	});
	db.close();

	// Log Results
	console.log('Finished DB Seed!')
	// console.log(users.length + ' users');
	// console.log(assets.length + ' assets');
	// console.log(points.length + ' points');

} else if(!fs.existsSync('seeds/test.json')) {
	console.error('ERROR: seeds/test.json missing.');
	// console.error('Please re-install from git repo.');
}
