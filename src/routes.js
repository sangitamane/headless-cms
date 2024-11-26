import express from 'express';
import apiFetch from '@wordpress/api-fetch';
import fetch from 'node-fetch';


const router = new express.Router();
const environment = process.env.NODE_ENV || 'production';

const data = {
	production: environment === 'production',
	// language: 'en'
};

const GRAPHQL_ENDPOINT = 'https://cmsadmin1.wpenginepowered.com/graphql'

async function fetchGraphQL(query) {
	const response = await fetch(GRAPHQL_ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ query }),
	});
	const data = await response.json();
	return data;
  }
  
const WPENGINE_PASSWORD = process.env.WPENGINE_PASSWORD;
const WPENGINE_USER_ID = process.env.WPENGINE_USER_ID;

const authorization = "Basic " + Buffer.from(WPENGINE_USER_ID + ":" + WPENGINE_PASSWORD).toString('base64')

router.get('/', (request, res) => {
	res.render('home', {
		...data,
		title: 'Home is where the CMS is'
	});
});



// Example route to fetch posts
router.get('/posts', async (req, res) => {
	const query = `
		{
			posts {
				nodes {
					id
					title
					content
					date
				}
			}
		}
		`;
	const data = await fetchGraphQL(query);
	res.render('posts', { posts: data.data.posts.nodes });
});

export {router};
