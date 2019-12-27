module.exports = {
	name: 'avatar',
	aliases: ['ava', 'pfp'],
	description: 'Displays the user\'s or tagged user\'s avatar.',
	execute(message) {
		if (!message.mentions.users.size) {
			return message.channel.send(`${message.author.username}'s avatar:\n`
						+ `${message.author.displayAvatarURL}`);
		}

		return message.channel.send(`${message.mentions.users.last().username}'s avatar:\n`
						+ `${message.mentions.users.last().displayAvatarURL}`);
	},
};