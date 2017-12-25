let gController = null;
(function () {
	'use strict';
	document.addEventListener('DOMContentLoaded', () => {
		const ClassController = function (theNow) {
			const self = this;
			self.util = {
				assert(theAssertion) {
					if (theAssertion !== true) {
						alert('assertion failed');
					}
				},
				keys: theObject => {
					const ret = [];
					for (const aProperty in theObject) {
						if (theObject.hasOwnProperty(aProperty)) {
							ret.push(aProperty);
						}
					}
					return ret;
				},
				createElement: function createElement(theTag, theProperties, theClassList) {
					const ret = document.createElement(theTag);
					if ((typeof undefined !== typeof theProperties) && (theProperties !== null)) {
						this.keys(theProperties).forEach(theProperty => {
							ret[theProperty] = theProperties[theProperty];
						});
					}
					if ((typeof undefined !== typeof theClassList) && (theClassList !== null)) {
						theClassList.forEach(theClass => {
							ret.classList.add(theClass);
						});
					}
					return ret;
				},
				log: function log(theMessage) {
					console.log(theMessage);
				},
				logObject: function logObject(theObject) {
					this.log(JSON.stringify(theObject));
				},
				nodeListToArray: function nodeListToArray(theNodeList) {
					return Array.prototype.slice.call(theNodeList);
				},
				removeSelectorAll(theSelector) {
					const aDOMResult = document.querySelectorAll(theSelector);
					this.nodeListToArray(aDOMResult).forEach(theDom => {
						theDom.parentNode.removeChild(theDom);
					});
				}
			};
			self.unusedArg = function unusedArg() {
			};

			self.ajax = {
				request: function request(method, url, data, handler) {
					const httpRequest = new XMLHttpRequest();
					httpRequest.onreadystatechange = function () {
						handler(httpRequest);
					};
					httpRequest.ontimeout = function () {
						alert('ontimeout: ' + url);
					};
					httpRequest.open(method, url);
					httpRequest.send(data);
				}
			};
			self.buttonDisable = function enableButton(theButton) {
				theButton.classList.remove('normal');
				theButton.classList.add('busy');
			};
			self.buttonEnable = function enableButton(theButton) {
				theButton.classList.remove('busy');
				theButton.classList.add('normal');
			};
			self.model ={
				convert: null
			}
			self.show = function show() {
				const aDOMContainer = document.getElementById('container');
				const aDOMTestDateResult = self.util.createElement('div', {textContent: ''}, ['result']);
				const aDOMFooter = self.util.createElement('div');
				const aDOMLink = self.util.createElement('a', {href: 'https://github.com/isghe/satoshieuro-eurobitcoin_converter', textContent:'github'});
				aDOMFooter.appendChild (aDOMLink);
				// <input type="text" value="" placeholder="satoshis/euro">
				const aDOMInputSatoshiEuro = self.util.createElement('input', {type: 'text', value:'', placeholder:'satoshis/euro', maxlength:30, size:30,
					onclick: function (theEvent){
						self.model.convert = function (theEvent){
							aDOMInputEuroBitcoin.value = 1/(aDOMInputSatoshiEuro.value/100000000);
						}; 
					}
				}, ['input_text']);
				const aDOMInputEuroBitcoin = self.util.createElement('input', {type: 'text', value:'', placeholder:'euros/bitcoin', maxlength:30, size:30,
					onclick: function (theEvent){
						self.model.convert = function (theEvent){
							aDOMInputSatoshiEuro.value = 1/(aDOMInputEuroBitcoin.value/100000000);;
						}; 
					}
				}, ['input_text']);

				var aDOMButtonConvert = self.util.createElement('div', {
					textContent: 'Convert',
					onclick: function (theEvent) {
						self.model.convert (theEvent);
					}
				}, ['ig_button', 'normal']);
				[
					aDOMInputSatoshiEuro, aDOMButtonConvert, aDOMInputEuroBitcoin, aDOMFooter
				].forEach(theDOM => {
					aDOMContainer.appendChild(theDOM);
				});
			};
		};
		gController = new ClassController(new Date());
		gController.show();
	});
})();

