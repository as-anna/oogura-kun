module.exports = function(user) {
	return {
		color: 0xdbba97,
		title: `${user.username}'s avatar:`,
		description: `[avatar link](${user.displayAvatarURL})`,
		image: {
			url: user.displayAvatarURL,
		},
	};
};