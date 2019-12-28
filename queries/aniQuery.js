module.exports = `
query ($search: String, $type: MediaType) {
    Media(search: $search, type: $type) {
		id
		type
        title {
			romaji
			english
			native
        }
        coverImage {
            large
        }
        status
        description(asHtml: true)
    }
}
`;