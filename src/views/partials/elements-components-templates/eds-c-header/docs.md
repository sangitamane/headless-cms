# Header

The Springer Nature header includes:

- the product’s logo which appears on the top left
- a list of navigation links that collapse into a menu on smaller viewports
- a search tool that appears next to the list of links 

The header can also be configured to include features from other Springer Nature teams such as the SN Profile, using a Login/Account link on the top right.

## Demo

{% demo 'Header', 'headerDemo', demos.headerDemo, component.brand %}


## When to use this component

Use the Springer Nature Header for any product or service under the Springer Nature brand.


## When not to use this component

Do not use this component for a Nature Portfolio or Springer branded product. If working on Nature Portfolio, use the [nature header](http://eds.springernature.com/components/nature/nature-header/).


## How it works

### Installation

To install the components, [go to the get started guide for developers](https://github.com/springernature/elements#readme).

To use the Header component, enter the following command in your Terminal:

```bash
npm install @springernature/elements
```

Then, import the style of the Header component into your `scss` file:

```scss
@import '../../node_modules/@springernature/elements/components/eds-c-header';
```

### Configurations

There are 3 variants of the Header component:
- with navigation
- without navigation
- logo only
#### With navigation

Navigation links must reflect the top level structure and support the main user journeys of the product. 

Before you include navigation in the header, make sure:

- the proposed navigation is tested with users
- links are clearly labeled and unambiguous
- links follow our content style guide

Navigation links will collapse into a menu at smaller viewports.

{% demoImage demos.headerDemo.site.images.placeholderLinks %}

##### Navigation and search

{% demoImage demos.headerDemo.site.images.placeholderLinksSearch %}

When the search button is active, the header will expand to show an input field.

{% demoImage demos.headerDemo.site.images.placeholderLinksSearchOpen %}

Only include the search tool if your product is able to provide search functionality.



#### Without navigation

Use header variant without navigation when you need a user to focus on a single task before progressing to the next step. For example:

- login page
- error message such as Page not found
- checkout flow

To use the header variant without navigation:

- remove the `headerNavigation` and `headerSearch` objects in the data that is passed in the template (see json example of the component).
- in your data, add `"variantDataAttribute": "data-eds-c-header-without-nav",` property (see an example in the sandbox code)

{% demoImage demos.headerDemo.site.images.noNavLogoAccount %}

#### Logo Only

Use the logo only variant when you want to display the logo on its own, without navigation or other features.

To use the header variant logo only, pass, as data to the template, only `logo: {src, alt}`, `loggedIn: false` and `snid: false` (see json example or schema of the component or see an example in the sandbox code).

##### Features from other SN teams

You can use features from outside of the header component, such as SN Profile or the shopping cart. Like the search tool, an icon helps distinguish them from a navigation link. 

Do not include more than 2 features (not including SN Profile) in order to maintain visibility at different viewports.

{% demoImage demos.headerDemo.site.images.fullCartItems %}

To include the Shopping Cart in the Header component use a handlebars dynamic partial. [Contact the Shopzilla team on Slack to find out more](https://springernature.slack.com/archives/C01L2T3V9M3).

#### SN Profile

SN Profile provides users with a single, secure profile that they can use for all SN products and services. A user can create, manage and log in/out of their account through SN Profile.

If your product has yet to be integrated with SN Profile, post in the [#askidentity Slack channel](https://springernature.slack.com/archives/C0GHN4XR9) or contact the Identity team at identity@sprignernature.com.

When a user is not logged in, the header will show a 'Log in' link to the SN login flow.

{% demoImage demos.headerDemo.site.images.placeholderNavLogIn %}

When a user is logged in, if there is no javascript then the header will show a link to account details. If there is javascript then it will show a menu with links to _Account settings_, _Your research_ and _Log out_.

{% demoImage demos.headerDemo.site.images.placeholderNavAccountOpen %}

To include SN Profile in the Header component use a handlebars dynamic partial. [Contact the Identity team on Slack to find out more](https://springernature.slack.com/archives/C0GHN4XR9).

#### Branding

The product logo must always link to the domain's homepage. Your product’s logo must be approved by the brand team.

#### Testing

Test hooks have been provided as options. Please see `loginLink.dataTest` and `logo.dataTest` data fields.

### Javascript

The javascript of the Header component is a JS Class. The contructor works with a default selector.
If you use the header component without the navigation, please pass `'data-eds-c-header-without-nav'` to the constructor, as in following example:

```js
import EdsCHeader from '../path/to/components/eds-c-header/js/eds-c-header';

// Default Header
const header = new EdsCHeader();
header.init();

// Header without navigation
const headerWithoutNav = new EdsCHeader('data-eds-c-header-without-nav');
headerWithoutNav.init();
```

If you want to see an example on how we use this component's templates, please have a look at the code in  [sandbox app](https://github.com/springernature/elements/blob/main/development/sandbox/views/index.hbs) in `main` branch.

## Help improve this page

|                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| If you’ve got a question, idea or suggestion about how to improve this component or guidance, post in the [#ask-elements Slack channel](https://springernature.slack.com/archives/CNBTFLBLP). |
