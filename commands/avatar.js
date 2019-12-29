module.exports = {
	name: 'avatar',
	aliases: ['ava', 'pfp'],
	description: 'Displays the user\'s or tagged user\'s avatar.',
	execute(message) {
		if (!message.mentions.users.size) {
			const avaEmbed = require('../embeds/avaEmbed')(message.author);
			return message.channel.send({ embed: avaEmbed });
		}

		const avaEmbed = require('../embeds/avaEmbed')(message.mentions.users.last());
		return message.channel.send({ embed: avaEmbed });
	},
};