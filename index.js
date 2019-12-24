const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();

client.on('message', (msg) => {

    if (message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if (msg.content.toLowerCase().includes('tadaima')){
        msg.channel.send(`Okaeri!`);
    }
});

client.once('ready', () => {
    console.log('Oogura-kun is now connected');

    // client.channels.find(x => x.name === 'oogura-dev').send("Hey");
});

client.login(token);