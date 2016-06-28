import {DOMObject} from "./DOMObject.js";


export class Button extends DOMObject {
	constructor(data, parent) {
		super(data, parent);
	}

	initialize() {
		this.template = '<div class = "[%classes%]" style="[%wrapperstyle%]">' +
							'<input type="button"  value="[%text%]"  style="[%style%]" />' + 
						'</div>';

		this.baseClass = 'sendsay-button';
		this.applicableStyles = {
			'background-color': { param: 'backgroundColor' },
			'border-radius': { param: 'borderRadius', postfix: 'px' },
			'color': { param: 'textColor'},
			'line-height': { param: 'lineHeight', postfix: 'em' ,default: 'normal'},
			'font-family': { param: 'fontFamily'},
			'font-size': { param: 'fontSize', postfix: 'px'}
		};
		this.wrapperApplStyles = {
			'padding-bottom': { param: 'paddingBottom', postfix: 'px'},
			'padding-top': { param: 'paddingTop', postfix: 'px'},
			'padding-left': { param: 'paddingLeft', postfix: 'px'},
			'padding-right': { param: 'paddingRight', postfix: 'px'}
		};		
	}

	addEvents() {
		if(this.el) {
			this.el.querySelector('input').addEventListener('click', this.handleClick.bind(this));
		}
	}

	handleClick() {
		this.trigger('sendsay-click');
	}

	removeEvents() {
		if(this.el) {
			this.el.querySelector('input').removeEventListener('click', this.handleClick.bind(this));
		}
	}

	makeStyles() {
		let data = this.data.appearance || {};
		data.fontFamily = this.escapeStyle(data.fontFamily);
		let styleObj = super.makeStyles();
		if(data.align === 'justify')
			styleObj.width = '100%';
		return styleObj;
	}

	makeSettings() {
		let data = this.data.content || {},
			settings = super.makeSettings();
		settings.text = this.escapeHTML(data.text || 'Unknown');
		settings.wrapperstyle = this.makeWrapperStyle();
		return settings;
	}

	makeWrapperStyle() {
		let style = {},
			data = this.data.appearance || {};

		if(data.align !== 'justify')
			style['text-align'] = data.align;
		style = this.extend(style, this.applyStyles(this.wrapperApplStyles));
		return this.convertStyles(style)
	}

}