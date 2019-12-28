module.exports = {
	name: 'user',
	description: 'Displays user info',
	execute(message, args) {
		const embedTry = require('../embeds/userEmbed')(message.author);
		console.log(args);
		message.channel.send({ embed: embedTry });
	},
};