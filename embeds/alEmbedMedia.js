module.exports = function(media) {

	let color = 0x0;
	switch(media.data.Media.status) {
		case 'FINISHED':
			color = 0xc6f0b9;
			break;
		case 'RELEASING':
			color = 0xe5f0b9;
			break;
		case 'NOT_YET_RELEASED':
			color = 0xb9c9f0;
			break;
		case 'CANCELLED':
			color = 0xf0c2b9;
			break;
		default:
			break;
	}

	const embed = {
		color: color,
		title: `${media.data.Media.title.romaji} (${media.data.Media.title.native})`
			|| media.data.Media.title.native,
		description: media.data.Media.description.replace(/(<([^>]+)>)/ig, ''),
		thumbnail: {
			url: media.data.Media.coverImage.large,
		},
		fields: [
			{
				name: 'Status: ',
				value: media.data.Media.status,
				inline: true,
			},
		],
		timestamp: new Date(),
	};

	if (media.data.Media.type == 'ANIME') {
		embed.fields.push({
			name: 'Episodes: ',
			value: media.data.Media.episodes || 'Unknown',
			inline: true,
		},
		{
			name: 'Season: ',
			value: `${media.data.Media.season} ${media.data.Media.seasonYear}` || 'N/A',
			inline: true,
		});
	}
	else if (media.data.Media.type == 'MANGA') {
		embed.fields.push({
			name: 'Chapters: ',
			value: media.data.Media.chapters || 'Unknown',
			inline: true,
		},
		{
			name: 'Volumes: ',
			value: media.data.Media.volumes || 'Unknown',
			inline: true,
		});
	}

	embed.fields.push({
		name: 'Average Score: ',
		value: media.data.Media.averageScore || 'N/A',
		inline: true,
	},
	{
		name: 'Format: ',
		value: media.data.Media.format || 'Unknown',
		inline: true,
	},
	{
		name: 'Source: ',
		value: media.data.Media.source || 'Unknown',
		inline: true,
	},
	{
		name: 'Genres: ',
		value: media.data.Media.genres.join(', '),
		inline: true,
	},
	{
		name: 'DB Links',
		value: `[Anilist](https://anilist.co/${media.data.Media.type.toLowerCase()}/${media.data.Media.id}/)`
				+ (`, [MyAnimeList](https://myanimelist.net/${media.data.Media.type.toLowerCase()}/${media.data.Media.idMal})` || ''),
	});

	return embed;
};