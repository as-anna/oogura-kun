module.exports = {
    name: 'server',
    description: 'Displays server info',
    execute(message, args) {
        message.channel.send(`Name: ${message.guild.name}\n`
                            + `Region: ${message.guild.region}\n`
                            + `Total Member Count: ${message.guild.memberCount}\n`
                            + `Created On: ${message.guild.createdAt}`);
    },
};