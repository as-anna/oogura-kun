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
		description: media.data.Media.description.replace(/<br\s*\/?>/gi, ' '),
		thumbnail: {
			url: media.data.Media.coverImage.large,
		},
		timestamp: new Date(),
	};

	const fields = [
		{
			name: 'Status: ',
			value: media.data.Media.status,
			inline: true,
		},
	];

	if (media.data.Media.type == 'ANIME') {
		fields.push({
			name: 'Episodes: ',
			value: media.data.Media.episodes || 'Unknown',
			inline: true,
		});
	}
	else if (media.data.Media.type == 'MANGA') {
		fields.push({
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
	// console.log(fields);

	embed.fields = fields;

	return embed;
};