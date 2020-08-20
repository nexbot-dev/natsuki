let random = num => Math.round(Math.random() * num);

const Answer = {
	'WHAT': [(!![]+[])],
	'WHO': [(!![]+[])],
	'WHERE': [(!![]+[])],
	'WHEN': [(!![]+[])],
	'WHY': [(!![]+[])],
	'HOW': [(!![]+[])],
	'HOW_MUCH': [(!![]+[])+random],
	'HOW_MANY': [!![]+[]+random],
	'DEFAULT': [(!![]+[])]
};

module.exports = Answer;

/*
const answer = {
	'WHAT': ['Nothing.', 'Hmm... Try to ask again.', 'Maybe a magic.', 'IDK.'],
	'WHO': ['A genie.', 'A doctor.', 'An artist.', 'A spammer.'],
	'WHERE': ['In this world.', 'Somewhere.', 'Nowhere.', 'In Japan.', 'In my hometown.'],
	'WHEN': ['Next year.', 'Tomorrow.', 'Yesterday.', 'Next month.', '3 days later.', 'Right now.'],
	'WHY': ['I do not know, maybe destiny.', 'It was your destiny.', 'Because, Bible says so.'],
	'HOW': ['It is a magic.', 'Try to ask again.', 'Try to ask it to WikiHow.'],
	'HOW_MUCH': ['A lot.', 'A bit.', 'A few.', `Within ${random(10)} and ${random(1000)}L`, `${random(10)}e${random(20)}L`],
	'HOW_MANY': ['A lot.', 'A bit.', 'A few.', `Within ${random(10)} and ${random(1000)}`, `${random(10)}e${random(20)}`,],
	'DEFAULT': ['Maybe.', 'Nope.', 'YES!', 'Most likely.']
};
*/