"use strict";

const fsP = require("fs/promises");
const axios = require("axios");

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

/** Takes a url and tries to read its HTML contents, returns error if path DNE */
async function webCat(url) {
	try {
		const resp = await axios.get(url);
		console.log(resp.data);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
}

argv[2].includes("http") ? webCat(argv[2]) : cat(argv[2]);
