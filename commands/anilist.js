// const { GraphQLClient } = require('graphql-request');
const fetch = require('isomorphic-fetch');
const util = require('util');
const query = require('../aniQuery');
// const query = require('../aniQuery');

module.exports = {
	name: 'anilist',
	aliases: ['ani'],
	description: 'Access some features of anilist ig',
	execute(message, args) {

		const variables = {
			id: 104052,
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

		function handleData(data) {
			console.log(util.inspect(data.data.Media.title, false, null, true));
		}

		function handleError(error) {
			console.error(error);
		}

		/*
		const client = new GraphQLClient(url, {
			redirect: 'follow',
		});

		message.channel.send(args);
		message.channel.send(client.url);

		const response = client.request(query, {
			search: args[0],
			type: 'ANIME',
		})
			.then(data => data)
			.catch(error => ({
				error: console.log(error),
			}));

		const dat = response.Media;

		message.channel.send(dat);
		*/
	},

};