module.exports = {
	owner: '445789748083163139',
	version: 'v2.6.2',
	color: '#ee1280',
	prefix: ['n!', 'natsuki,'],
	logo: '',
	setup: {
		invite: {
			server: '',
			bot: ''
		},
		donate: {
			patreon: ''
		},
		vote: [
			// [vote_sitename, vote_link]
			['topgg', ''],
			['botfordiscord', ''],
			['discordbotlist', '']
		],
		version: {
			nodejs: '',
			discordjs: ''
		}
	},
	api: {
		aen: {
			roast: 'https://aenma-api.glitch.me/text/roast'
		},
		sra: {
			animal: 'https://some-random-api.ml/animal/',
			lyric: 'https://some-random-api.ml/lyrics',
			meme: 'https://some-random-api.ml/meme'
		},
		synonym: 'https://api.datamuse.com/words',
		urban: 'http://api.urbandictionary.com/v0/define',
		weeb: {
			request: 'https://rra.ram.moe/i/r',
			cdn: 'https://cdn.ram.moe'
		}
	}
}