module.exports = {
	name: 'user',
	description: 'Displays user info',
	execute(message, args) {
		message.channel.send(`ID: ${message.author.id}`);
		console.log(args);
	},
};