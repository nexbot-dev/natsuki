import fs from 'node:fs/promises';
import { URL } from 'node:url';

export async function readDirectory(directory: string) {
	const directoryPath = new URL(directory, import.meta.url);
	const directoryFiles = await fs.readdir(directoryPath);
	const filteredFiles = directoryFiles.filter(file => file.endsWith('.js'));

	return {
		directoryPath,
		filteredFiles,
	};
}