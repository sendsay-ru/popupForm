
import {Popup} from "./classes/elements/Popup.js";
import {PopupBar} from "./classes/elements/PopupBar.js";
import {ToggleablePopup} from "./classes/elements/ToggleablePopup.js";
import {Connector} from "./classes/Connector.js";
import {Form} from "./classes/Form.js";
(function() {


	var activatePopup  = function(url, options) {
		loadCss(function() {
			var connector = new Connector(url);
			var form = new Form(connector, options);
		});
	};

	var showPopup = function(data, options) {
		loadCss(function() {
      var domConstructor;
      switch(data.type) {
        case 'popup':
          domConstructor = Popup;
          break;
        case 'bar':
          domConstructor = PopupBar;
          break;
        case 'widget':
          domConstructor = ToggleablePopup;
          break;
      }
      let popup = new domConstructor(data);
      popup.activate(options);
    });
	}

	var loadCss = function(callback) {
		var cssId = '_sendsay-styles';
		if (!document.getElementById(cssId)) {
		    var head  = document.getElementsByTagName('head')[0];
		    var link  = document.createElement('link');
		    var loaded = false;

		    link.id   = cssId;
		    link.rel  = 'stylesheet';
		    link.type = 'text/css';
		    link.href = 'https://image.sendsay.ru/app/js/forms/forms.css';
		    link.media = 'all';

		    var sibling = document.querySelector('#sendsay-generated-sheet');
		    if(sibling) {
		    	document.head.insertBefore(link, sibling);
		    } else {
		    	document.head.appendChild(link);
		    }
		    link.addEventListener('load', function() {
		    	link.removeEventListener('load', callback);

		    	if(!loaded) {
		    		loaded = true;

		    		callback();
		    	}
		    });
		} else {
			if (typeof callback === 'function') {
				callback();
			}
		}
	}
	window.SENDSAY = {
		activatePopup: activatePopup,
		showPopup: showPopup
	};
})();