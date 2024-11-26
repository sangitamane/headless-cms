const schema = require('./data/eds-c-header.schema.json');
const exampleJson = require('./data/eds-c-header-test.mock.json');
const fs = require('fs');
const path = require('path');
const partialsDir = __dirname;
const filenames = fs.readdirSync(partialsDir);
const headerTemplate = fs.readFileSync(path.resolve(__dirname, 'eds-c-header.hbs'), 'utf8');
const headerExpanderTemplate = fs.readFileSync(path.resolve(__dirname, 'eds-c-header-expander.hbs'), 'utf8');
const Ajv = require("ajv");
const ajv = new Ajv();
const handlebars = require('handlebars');
import EdsCHeader from './js/eds-c-header';

const templateHeader = handlebars.compile(headerTemplate);
const templateExpander = handlebars.compile(headerExpanderTemplate);
const renderedHeader = templateHeader(exampleJson);
const renderedExpander = templateExpander(exampleJson);

describe('EDS Component Header', () => {

    const element = {};

    beforeEach(() => {
        document.body.innerHTML = renderedHeader + renderedExpander;
        element.buttonHeaderAccount = document.querySelector('[data-eds-c-header-test-account-btn]');
        element.buttonHeaderSearch = document.querySelector('[data-eds-c-header-test-search-btn]');

        element.header = document.querySelector('[data-eds-c-header]');

        element.expandedPanelHeaderAccount = document.querySelector('#eds-c-header-account');
        element.expandedPanelHeaderSearch = document.querySelector('#eds-c-header-popup-search');
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('should set role for buttons', () => {
        const headerComponent = new EdsCHeader();
        headerComponent.init();
        expect(element.buttonHeaderAccount.getAttribute('role')).toBe('button');
        expect(element.buttonHeaderSearch.getAttribute('role')).toBe('button');
    });

    test('should append expanded UI after Account btn', () => {
        const headerComponent = new EdsCHeader();
        headerComponent.init();
        element.targetAfterButtonAccount = element.buttonHeaderAccount.nextElementSibling;
        expect(element.targetAfterButtonAccount).toBe(element.expandedPanelHeaderAccount);
    });

    test('should append search panel UI after header element', () => {
        const headerComponent = new EdsCHeader();
        headerComponent.init();
        const searchPanel = element.header.nextSibling;
        expect(searchPanel).toBe(element.expandedPanelHeaderSearch);
    });

    test('docs file exists', () => {
        const exists = fs.existsSync(path.resolve(__dirname, 'docs.md'));
        expect(exists).toBe(true);
    });
});

describe('Header Schema Validation and Accessibility Test', () => {

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
        document.body.innerHTML = renderedHeader;
        const container = document.querySelector('*');
        expect(container).toBeDefined();
    });
    
    test('Template passes basic HTML accessibility', async () => {
        expect(await axe(renderedHeader)).toHaveNoViolations();
    });
});
