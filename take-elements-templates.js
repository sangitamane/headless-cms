// this is just an example of a script that takes the elements components templates and
// puts them into a consumer node application
// use a similar script to take the elements components templates from node_modules 

// do a npm run elements:templates in the root of this application, this command will run this script and make elements templates available to this node app for use.

import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import jetpack from 'fs-jetpack';
const {copy} = jetpack;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ELEMENTS_PACKAGE_PATH = join(__dirname, 'node_modules', '@springernature', 'elements', 'components');
const VIEWS_PATH = join(__dirname, 'src/views', 'partials');

const movePartials = (src, dest) => {
	copy(src, dest);
};

movePartials(ELEMENTS_PACKAGE_PATH, join(VIEWS_PATH, 'elements-components-templates'));