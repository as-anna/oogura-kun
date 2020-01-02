const mdApi = require('mangadex-full-api');
const { mdUser, mdPass } = require('../config.json');
const newLimit = 10;
const fs = require('fs');

module.exports = {
	name: 'mangadex',
	aliases: ['md'],
	description: 'Fetches latest updates of followed manga',
	execute(channel) {
		mdApi.agent.login(mdUser, mdPass, false).then(() => {

			const oldUpdates = fs.readFileSync('./mdlists/updates.txt').toString().split('\n');
			console.log(oldUpdates.join(', '));
			const home = new mdApi.Home();

			home.fill().then(() => {
				const newest = home.newest.slice(0, newLimit);

				newest.forEach((manga) => {
					if (!oldUpdates.includes(manga.id) && fs.existsSync(`./mdlists/${manga.id}.txt`)) {
						let tags = fs.readFileSync(`./mdlists/${manga.id}.txt`).toString().split('\n');
						tags.splice(-1, 1);
						tags = tags.map(id => '<@' + id.toString() + '>');
						console.log(tags);
						// TODO: Make a neat embed for update
						channel.send(`${manga.title} updated, ${tags.join(' ')}`);
					}
				});

				fs.writeFile('./mdlists/updates.txt', newest.map(manga => manga.id).join('\n'), (error) => {
					if (error) console.log(error);
				});

			});

			oldUpdates.forEach(mangaID => {
				console.log(mangaID);
			});


		}).catch((error) => {
			return console.log(error);
		});

		return;
	},
};