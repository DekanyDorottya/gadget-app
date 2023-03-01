const { readFile, writeFile } = require("fs/promises");

const fileReaderAsync = async (filePath) => {
	try {
		return await readFile(filePath);
	} catch (error) {
		console.error(`File reading error: ${error.message}`);
	}
};

const fileWriterAsync = async (filePath, data) => {
	try {
		return await writeFile(filePath, data);
	} catch (error) {
		console.error(`File writing error: ${error.message}`);
	}
};

module.exports.read = fileReaderAsync;
module.exports.write = fileWriterAsync;
