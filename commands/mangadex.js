const mdApi = require('mangadex-full-api');
const { mdUser, mdPass } = require('../config.json');

module.exports = {
	name: 'mangadex',
	aliases: ['md'],
	description: 'Fetches latest updates of followed manga',
	execute(message) {
		mdApi.agent.login(mdUser, mdPass, false).then(() => {
			const manga = new mdApi.Manga();

			manga.fillByQuery('Ancient Magus Bride').then((media) => {
				console.log(`${media.title} by ${media.authors.join(', ')}`);
			});

			const home = new mdApi.Home();

			home.fill().then(() => {
				const newest = home.newest.slice(0, 5);

				const newestTitles = [];

				let x = 0;
				for (x = 0; x < 5; x++) {
					newestTitles[x] += newest[x].title;
				}
				message.channel.send(newestTitles.join(', '));
			});

		}).catch((error) => {
			return console.log(error);
		});

		return message;
	},
};