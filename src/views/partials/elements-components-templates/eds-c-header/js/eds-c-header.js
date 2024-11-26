import {makeArray, Expander} from '../../../themes/springernature/js/helpers';

class EdsCHeader {

	constructor(selector = 'data-eds-c-header'){
		this.selector = `[${selector}]`;
		this.dataComponent = '[data-eds-c-header-expander]';
		this.expanderAnchor = '[data-eds-c-header-expander-anchor]';
		this.tethered = 'has-tethered';
	}

	findTarget(headerElement, selector){
		if (selector) {
			return document.querySelector(selector);
		}
		return null;
	}

	init() {
		const headerElement = document.querySelector(this.selector);

		if (!headerElement) {
			return;
		}

		const triggerElements = document.querySelectorAll(this.dataComponent);

		if (triggerElements.length === 0 || !headerElement) {
			return;
		}

		makeArray(triggerElements).forEach(trigger => {
			const targetElement = this.findTarget(headerElement, trigger.hash);

			if (!targetElement) {
				return;
			}
			const triggerAttributes = [{name: 'role', value: 'button'}];
			triggerAttributes.forEach(function (attribute) {
				trigger.setAttribute(attribute.name, attribute.value);
			});
			if (targetElement.hasAttribute('data-eds-c-header-expander-append')) {
				headerElement.querySelector(this.expanderAnchor).append(targetElement);
			} else {
				headerElement.after(targetElement);
			}
			targetElement.classList.add(this.tethered);
			const expander = new Expander(trigger, targetElement, {AUTOFOCUS: 'firstTabbable'});
			expander.init();

			return expander;
		});
	}
}

export default EdsCHeader;

