/**
 * Function to generate a random number
 * @param max The maximum number can be generated
 * @returns A random number
 */
export function rng(max: number) {
	return Math.floor(Math.random() * max);
}