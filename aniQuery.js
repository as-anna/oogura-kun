module.exports = `
query ($search: String, $type: MediaType, $id: Int) {
    Media(search: $search, type: $type, id: $id) {
        id
        siteUrl
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
        averageScore
    }
}
`;