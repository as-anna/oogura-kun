const mdApi = require('mangadex-full-api');
const { mdUser, mdPass } = require('../config.json');
const newLimit = 10;

module.exports = {
	name: 'mangadex',
	aliases: ['md'],
	description: 'Fetches latest updates of followed manga',
	execute(message) {
		mdApi.agent.login(mdUser, mdPass, false).then(() => {
			/**
			const manga = new mdApi.Manga();

			manga.fillByQuery('Oyasumi Punpun').then((media) => {
				console.log(`${media.title} by ${media.authors.join(', ')}`);
			});
			*/

			const home = new mdApi.Home();

			home.fill().then(() => {
				const newest = home.newest.slice(0, newLimit);

				const newestTitles = [];

				let x = 0;
				for (x = 0; x < newLimit; x++) {
					newestTitles[x] = newest[x].id;
					console.log(`${newest[x].id}`);
				}

				// const newUpdates = [];
				message.channel.send(newestTitles.join(', '));
			});

		}).catch((error) => {
			return console.log(error);
		});

		return message;
	},
};