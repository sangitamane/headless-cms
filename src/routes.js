import express from 'express';

const router = new express.Router();
const environment = process.env.NODE_ENV || 'production';

const data = {
	production: environment === 'production',
	// language: 'en'
};

router.get('/', (request, res) => {
	res.render('home', {
		...data,
		title: 'Home is where the CMS is'
	});
});

export {router};
