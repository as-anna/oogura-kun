const fetch = require('isomorphic-fetch');
const util = require('util');
const query = require('../queries/aniQuery');

module.exports = {
	name: 'anilist',
	aliases: ['ani'],
	description: 'Access some features of anilist ig',
	execute(message, args) {

		if (args[0] == 'a') args[0] = 'ANIME';
		else if (args[0] == 'm') args[0] = 'MANGA';
		const variables = {
			type: args[0].toUpperCase(),
			search: args.slice(1).join(' '),
		};

		const url = 'https://graphql.anilist.co',
			options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				body: JSON.stringify({
					query: query,
					variables: variables,
				}),
			};

		fetch(url, options).then(handleResponse)
			.then(handleData)
			.catch(handleError);

		function handleResponse(response) {
			return response.json().then(function(json) {
				return response.ok ? json : Promise.reject(json);
			});
		}

		function handleData(resp) {
			console.log(util.inspect(resp.data.Media.title, false, null, true));
			const aniEmbed = require('../embeds/alEmbed')(resp);
			message.channel.send({ embed: aniEmbed });
		}

		function handleError(error) {
			console.log(error);
			message.channel.send('No such media found.');
		}
	},

};