module.exports = `
query ($search: String, $type: MediaType) {
    Media(search: $search, type: $type) {
		id
		idMal
		type
        title {
			romaji
			native
        }
        coverImage {
            large
        }
        status
		description(asHtml: false)
		episodes
		chapters
		volumes
		season
		seasonYear
		format
		genres
		averageScore
		source
    }
}
`;