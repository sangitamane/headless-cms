const schema = require('./data/eds-c-footer.schema.json');
const exampleJson = require('./data/eds-c-footer.example.json');
const fs = require('fs');
const path = require('path');
const partialsDir = __dirname;
const filenames = fs.readdirSync(partialsDir);
const componentTemplate = fs.readFileSync(path.resolve(__dirname, 'eds-c-footer.hbs'), 'utf8');
const corporateFooterTemplate = fs.readFileSync(path.resolve(`${__dirname}/partials/`, 'eds-c-footer-corporate.hbs'), 'utf8');
const productFooterTemplate = fs.readFileSync(path.resolve(`${__dirname}/partials/`, 'eds-c-footer-product.hbs'), 'utf8');
const Ajv = require("ajv");
const ajv = new Ajv();
const handlebars = require('handlebars');

// register the partials that are used inside the component main template
handlebars.registerPartial('eds-c-footer-product', productFooterTemplate);
handlebars.registerPartial('eds-c-footer-corporate', corporateFooterTemplate);

const componentHbs = handlebars.compile(componentTemplate);
const renderedComponent = componentHbs(exampleJson);

describe('EDS component footer', () => {
    test('docs file exists', () => {
        const exists = fs.existsSync(path.resolve(__dirname, 'docs.md'));
        expect(exists).toBe(true);
    });
});

describe('footer Schema Validation and Accessibility Test', () => {

    const validate = ajv.compile(schema);
    
    filenames.forEach(function (filename) {
        var matches = /^([^.]+).hbs$/.exec(filename);
        if (!matches) {
            return;
        }
        var name = matches[1];
        var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
        handlebars.registerPartial(name, template);
    });
    
    const { configureAxe, toHaveNoViolations } = require('jest-axe');
    expect.extend(toHaveNoViolations);
    
    const axe = configureAxe({
        rules: {
            region: { enabled: false }
        }
    });
    
    test('Example data matches schema', () => {
        const validate = ajv.compile(schema);
        const valid = validate(exampleJson);
    
        if (!valid) {
            // Extract and format the Ajv validation errors
            const errors = validate.errors.map((error) => ajv.errorsText([error])).join('\n');
            throw new Error(errors);
        }
    
        expect(valid).toBeTruthy();
    });
    
    test('Template can be compiled and rendered', () => {
        document.body.innerHTML = renderedComponent;
        const container = document.querySelector('*');
        expect(container).toBeDefined();
    });
    
    test('Template passes basic HTML accessibility', async () => {
        expect(await axe(renderedComponent)).toHaveNoViolations();
    });
});
