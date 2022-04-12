"use strict";

const fsP = require("fs/promises");

const argv = process.argv;

/** Takes a file name and tries to read the file if located in the current directory */

async function cat(path) {
	try {
		let contents = await fsP.readFile(path, "utf8");
		console.log("file contents:", contents);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
}

cat(argv[2]);
