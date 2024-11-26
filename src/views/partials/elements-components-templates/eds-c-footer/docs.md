# Footer

The footer gives copyright, licensing and other information about your service and department.

## When to use this component

Use this footer on all Springer, Nature Portfolio, and Springer Nature products and services.

## How it works

The footer is made up of the **Corporate footer** (required) and the **Product footer** (optional).

The corporate footer section can be configured in two ways.

The default option includes footer items that must be used everywhere.

Or you can use the extended footer option. This includes the same footer items, as well as some extra links that only some services need.

## Demo

{% demo 'Footer', 'footerDemo', demos.footerDemo, component.brand %}

### Corporate Default footer

#### Default footer items

Always include these items in your footer:

-   Your privacy choices/Manage cookies
-   Accessibility statement
-   Privacy policy

You must use this exact wording for the footer links so that they're the same across our products.

#### Your privacy choices/Manage cookies

This item uses `JavaScript` to open a dialog window when a user clicks it. The window shows the user how to manage their cookie preferences.

For that reason, the component uses a `<button>` element rather than an `<a>` element for the manage cookies action.

You'll need to integrate the third party script of a cookie consent banner into your application.

We use our main cookie consent banner provider at Springer Nature:

1. Springer Nature's custom [Consent Management Platform (CMP)](https://cookie-consent.public.springernature.app/docs/introduction/)

For CMP, read how to implement the button in the [Preference Dialog Trigger section of the cookie consent
documentation](https://cookie-consent.public.springernature.app/docs/getting-started/installation/#preference-dialog-trigger).

CMP users don't need to link to a cookie policy from the footer as it's covered in the platform itself.

See an example implementation in the [footer folder](https://github.com/springernature/elements/blob/main/components/eds-c-footer/eds-c-footer.hbs).

If you've got any questions about your cookie policy, email the Data Protection Manager, Quinton Creighton, at [quinton.creighton@springernature.com](mailto:quinton.creighton@springernature.com)

### Accessibility statement

The accessibility statement link in your footer must take users to the url in the [component's `data/footer.example.json` file](https://github.com/springernature/elements/blob/main/components/eds-c-footer/data/eds-c-footer.example.json).

If you're concerned that the accessibility statement isn't relevant for the product you're working on, contact Accessibility Specialist Hollie Kay or Jude Robinson on Slack.

### Privacy policy

The privacy policy you need to use to depends on the legal entity for the product you're working on. Talk to your Product Owner or Manager to find out which privacy policy to link to.

If you're still not sure, email the Data Protection Manager, Quinton Creighton, at [quinton.creighton@springernature.com](mailto:quinton.creighton@springernature.com).

### Corporate Extended footer

The extended footer contains the same links as the default footer, with the option to include:

-   Your US state privacy rights
-   Terms and conditions
-   Help and support

#### Your US state privacy rights

Your product or service needs to include a "Your US state privacy rights" link if it meets one of the following criteria.

1. It makes more than $25 million or more in annual revenue from California residents.
2. It holds the personal data of more than 50,000 Californian "consumers, households or devices".
3. It earns more than half of its annual revenue selling Californian consumers' personal data.

Your Product Owner or Manager should be able to confirm whether or not you need a "Your US state privacy rights" link. If you're still not sure, email the Data Protection Manager, Quinton Creighton, at [quinton.creighton@springernature.com](mailto:quinton.creighton@springernature.com).

If you need to include a "Your US state privacy rights" link, you must use the url in the [component's `data/footer.example.json` file](https://github.com/springernature/elements/blob/main/components/eds-c-footer/data/eds-c-footer.example.json).

#### Terms and conditions

The text you should use for this link depends on what it covers for your product or service. You might need to include more than one link.

The most common options are:

-   Terms and conditions
-   Terms of use
-   Impressum
-   Imprint

### Product footer

The optional product footer allows you to add groups of links specific to your product, with an accompanying title.

This sits above the corporate footer.

### Help and support links

Help and support should link to the relevant contact options your service offers.

## Installation

### Template configuration

#### Template partials

The main template (`index.hbs`) wraps partials included for the product and corporate footer sections. These partials are dynamic and their locations are stored in variables passed with the data - `productFooter` and `corporateFooter`. An example of this can be seen below.

#### Configuring the footer options

Within the template data you have the option to configure either the `default` or `extended` version of the corporate footer section, as well as the optional `product` footer section.

The `demo`'s `context.json` file shows both the `default` and `extended` versions of the footer, as well as one that includes a `product` section.

We use wrappers around each version to sandbox them in the demo - but you won't need these wrappers when you're using the component in your application.

The actual configuration of the `footer` should look something like this example:

```json
{
    "navigation": {
        "links": [
            {
                "text": "Example link",
                "uri": "/url/to/example/link"
            },
            {
                "text": "Example button",
                "buttonProperties": "onlick=\"doSomething()\""
            }
        ]
    },
	"productGroups": [
		{
			"title": "Example group  title",
			"items": [
				{
					"uri": "/url/to/example/link",
					"text": "Example link",
					"dataTrackAction": "optional-tracking-name"
				}
			]
		}
	],
    "image": {
        "src": "path/to/springer/nature/logo",
        "alt": "Springer Nature",
        "link": "https://www.springernature.com/"
    },
    "currentYear": 2023,
	"productFooter": "path/to/the/product/footer",
    "corporateFooter": "path/to/the/corporate/footer"
}
```

## Help improve this page

If you’ve got a question, idea or suggestion about how to improve this component or guidance, post in the [#design-systems Slack channel](https://springernature.slack.com/archives/C75DHBTBP).