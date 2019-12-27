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
    if (!message.content.startsWith(prefix) || message.author.bot){
        if (message.content.toLowerCase().includes('tadaima') && !message.author.bot){
            message.channel.send(`Okaeri!`);
        }
        return;
    }

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

    if (command === 'ping') {
		client.commands.get('ping').execute(message, args);
	} else if (command === 'server') {
        client.commands.get('server').execute(message, args);
    } else if (command === 'user') {
        client.commands.get('user').execute(message, args);
    }
});

client.once('ready', () => {
    console.log('Oogura-kun is now connected');

    // client.channels.find(x => x.name === 'oogura-dev').send("Hey");
});

client.login(token);