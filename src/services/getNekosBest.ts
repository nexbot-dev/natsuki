import { fetchData } from '#libs/fetchData';
import config from '#root/config';

type NekoGifType = {
	anime_name: string,
	url: string,
};

type ResultType = {
	results: NekoGifType[],
};

export type GifType =
	| 'baka' | 'bite' | 'blush' | 'bored' | 'cry' | 'cuddle' | 'dance' | 'facepalm' | 'feed'
	| 'handhold' | 'happy' | 'highfive' | 'hug' | 'kick' | 'kiss' | 'laugh' | 'nod' | 'nom'
	| 'nope' | 'pat' | 'poke' | 'pout' | 'punch' | 'shoot' | 'shrug' | 'slap' | 'sleep'
	| 'smile' | 'smug' | 'stare' | 'think' | 'thumbsup' | 'tickle' | 'wave' | 'wink' | 'yeet';

export async function getNekosBest(type: GifType) {
	const dataUrl = new URL(type, config.api.nekosbest);

	const result: ResultType = await fetchData({
		url: dataUrl.href,
	});

	return result;
}