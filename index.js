const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) {
		if (message.content.toLowerCase().includes('tadaima') && !message.author.bot) {
			message.channel.send('Okaeri!');
		}
		return;
	}

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	if (command.args && !args.length) {
		return message.channel.send('No arguments provided');
	}

	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.once('ready', () => {
	console.log('Oogura-kun is now connected');

	// client.channels.find(x => x.name === 'oogura-dev').send("Hey");
});

client.login(token);