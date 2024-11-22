import express from 'express';
import apiFetch from '@wordpress/api-fetch';
import fetch from 'node-fetch';


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

const API_BASE_URL = 'https://h84zz5jyx27wb61qlhm4de16i.js.wpenginepowered.com/wp-json/wp/v2';

// Example route to fetch posts
router.get('/posts', async (req, res) => {
	try {
		const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || API_BASE_URL;
		const response = await fetch(`${apiUrl}/posts`);
	  if (!response.ok) {
		throw new Error(`Error fetching posts: ${response.statusText}`);
	  }
	  const posts = await response.json();
	  res.render('posts', { title: 'Blog Posts', posts });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  });
  
  // Fetch and display pages
  router.get('/pages', async (req, res) => {
	try {
		const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || API_BASE_URL;

		const response = await fetch(`${apiUrl}/pages`);

	  if (!response.ok) {
		throw new Error(`Error fetching pages: ${response.statusText}`);
	  }
	  const pages = await response.json();
	  res.render('pages', { title: 'Pages', pages });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  });
  

export {router};
