import {DOMObject} from "./DOMObject.js";


export class Button extends DOMObject {
	constructor(data) {
		super();
		this.data = data;
		this.template = '<div class = "[%classes%]" style="[%wrapperstyle%]">' +
							'<input type="button"  value="[%text%]"  style="[%style%]" />' + 
						'</div>';

		this.baseClass = 'sendsay-button';
		this.applicableStyles = {
			'background-color': { param: 'backgroundColor' },
			'border-radius': { param: 'borderRadius', postfix: 'px' },
			'color': { param: 'textColor'},
			'line-height': { param: 'lineHeight' ,default: 'normal'}
		};
		this.build();
	}

	build() {
		return super.build();
	}

	makeStyles() {
		let styleObj = super.makeStyles(),
			data = this.data;
		if(data.align === 'justify')
			styleObj.width = '100%';
		return styleObj;
	}

	makeSettings() {
		let data = this.data,
			settings = super.makeSettings();
		settings.text = data.text || 'Unknown';
		settings.wrapperstyle = this.makeWrapperStyle();
		return settings;
	}

	makeWrapperStyle() {
		let style = {},
			data = this.data;

		if(data.align !== 'justify')
			style['text-align'] = data.align;

		return this.convertStyles(style)
	}
}