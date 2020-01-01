const mdApi = require('mangadex-full-api');
const { mdUser, mdPass } = require('../config.json');
const fs = require('fs');

module.exports = {
	name: 'mdlistlog',
	aliases: ['log'],
	description: 'Given a mangadex user id, logs that user\'s manga list and associates it with sender\'s discord account.',
	usage: '<mangadex id>',
	cooldown: 60,
	async execute(message, args) {
		mdApi.agent.login(mdUser, mdPass, false).then(() => {
			const list = new mdApi.MDList();

			getPages(args[0]).then((pages) => {
				message.channel.send(`id ${args[0]}, right? Logging...`);
				list.fill(args[0], pages)
					.then(()=>{

						list.manga.forEach(manga => {
							// eslint-disable-next-line max-nested-callbacks
							fs.appendFile(`./mdlists/${manga.id}.txt`, message.author.id, (error) => {
								if (error) throw error;
							});
						});

						return message.channel.send(`Done logging list id ${args[0]}!`);

					}).catch(console.error);
			});
		}).catch((error) => {
			message.channel.send('Something went wrong; check your id!');
			return console.log(error);
		});

		async function getPages(id) {
			const pages = await mdApi.MDList.getNumberOfPages(id);
			return pages;
		}
	},
};