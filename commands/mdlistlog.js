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
				list.fill(args[0], pages)
					.then(()=>{
						const file = fs.createWriteStream(`./mdlists/${args[0]}_list.txt`);
						file.on('error', function(error) {
							console.log(error);
						});

						const newUpdates = [];
						let x = 0;
						list.manga.forEach(manga => {
							newUpdates[x] = manga.id;
							x++;
						});

						newUpdates.forEach(mangaID => {
							file.write(mangaID + '\n');
						});

						file.end();
						console.log('done');

					}).catch(console.error);
			});


		}).catch((error) => {
			return console.log(error);
		});

		return message.channel.send(args);

		async function getPages(id) {
			const pages = await mdApi.MDList.getNumberOfPages(id);
			return pages;
		}
	},
};