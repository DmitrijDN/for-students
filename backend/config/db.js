module.exports = {
	dbname: 'newletterLikerApp',
	uri: 'mongodb://localhost/newsletter-liker',
	mocked_db: false,
	opts: {
		server: {
			auto_reconnect: true
		},
		user: 'root'
	}
};