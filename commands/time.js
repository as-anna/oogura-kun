module.exports = {
	name: 'time',
	description: 'Gives time of timezone/s provided',
	args: true,
	usage: '<timezone> OR <timezone1> <timezone2> <hour:minute>',
	execute(message, args) {
		message.channel.send(message);
		console.log(args);
	},
};