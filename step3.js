"use strict";

const fsP = require("fs/promises");
const axios = require("axios");

const argv = process.argv;

/** Takes a file name and tries to read the file if located in the current directory */

async function cat(path) {
    try {
        let contents = await fsP.readFile(path, "utf8");
        // console.log("file contents:", contents);
        return contents;
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

/** Takes a url and tries to read its HTML contents, returns error if path DNE */
async function webCat(url) {
    try {
        const resp = await axios.get(url);
        // console.log(resp.data);
        return resp.data;
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

/** Write Output function that takes in a output file and the content to write to the output file */
async function writeOutput(outPut, content) {
    try {
        await fsP.writeFile(outPut, content, "utf8");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    console.log("Successfully wrote to file!");
}

/** Main function that handles the logic. If user passes in --out flag then it writes the content to the output.
 * Otherwise, it will just read the input*/

async function main() {
    if (argv[2] === "--out") {

        let content = argv[4].includes("http") ? await webCat(argv[4]) : await cat(argv[4]);
        writeOutput(argv[3], content);
        console.log("promisess???", writeOutput(argv[3], content));
    }
    else {
        let content = argv[2].includes("http") ? await webCat(argv[2]) : await cat(argv[2]);
        console.log("content:", content)
    }
}

main()


