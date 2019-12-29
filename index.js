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

const cooldowns = new Discord.Collection();

client.on('message', (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) {
		if (message.content.toLowerCase().includes('tadaima') && !message.author.bot) {
			message.channel.send('Okaeri!');
		}
		return;
	}

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	// Command checks:
	// guild only
	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('This command won\'t work in DMs');
	}

	// args required
	if (command.args && !args.length) {
		let reply = 'Eh~ That\'s not the right way to use this command~';

		if (command.usage) {
			reply += `\nTry: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	// cooldowns
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`Calm down. Wait ${timeLeft.toFixed(1)} seconds before reusing command`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	// TODO: admin-only check

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
});

client.login(token);