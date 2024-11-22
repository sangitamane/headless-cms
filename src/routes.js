import express from 'express';
import apiFetch from '@wordpress/api-fetch';

apiFetch( { path: '/wp/v2/posts' } ).then( ( posts ) => {
	console.log( posts );
} );

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

// Example route to fetch posts
router.get('/posts', async (req, res) => {
	try {
		const posts = await apiFetch({ path: '/wp/v2/posts' });
		res.json(posts);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

export {router};
