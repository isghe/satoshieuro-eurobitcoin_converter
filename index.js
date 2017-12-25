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
			};

			self.show = function show() {
				const aDOMContainer = document.getElementById('container');
				const aDOMTestDateResult = self.util.createElement('div', {textContent: ''}, ['result']);
				const aDOMFooter = self.util.createElement('div', null, ['footer']);
				const aDOMLink = self.util.createElement('div');
				const aDOMHref = self.util.createElement('a', {href: 'https://github.com/isghe/satoshieuro-eurobitcoin_converter', textContent:'github'});
				aDOMLink.appendChild (aDOMHref);
				const aDOMBitcoin = self.util.createElement('div', {textContent: '1ig1p1awfjS5bQxy2s33AD8sVspy4YFMD'}, ['bitcoin']);
				const aDOMQR = self.util.createElement('img', {src: '1ig1p1awfjS5bQxy2s33AD8sVspy4YFMD.png', alt:'1ig1p1awfjS5bQxy2s33AD8sVspy4YFMD', width:'200', height:'200'});
				[aDOMLink, aDOMQR, aDOMBitcoin].forEach (theDOM => {
					aDOMFooter.appendChild (theDOM);
				});

				const aDOMInputSatoshiEuro = self.util.createElement('input', {type: 'text', value:'', maxlength:30, size:30,}, ['input_text']);

				const aDOMWrapResult = self.util.createElement('div', null, ['wrap-result']);
				const aDOMLabelResult = self.util.createElement('span', {textContent:'Result:'});
				const aDOMValueResult = self.util.createElement('span',null, ['result']);

				[aDOMLabelResult, aDOMValueResult].forEach (theDOM => {
					aDOMWrapResult.appendChild (theDOM);
				});

				const aDOMButtonConvert = self.util.createElement('div', {
					textContent: 'Convert',
					onclick: function (theEvent) {
						aDOMValueResult.textContent = 1/(aDOMInputSatoshiEuro.value/100000000);
					}
				}, ['ig_button', 'normal']);
				[
					aDOMInputSatoshiEuro, aDOMButtonConvert, aDOMWrapResult, aDOMFooter
				].forEach(theDOM => {
					aDOMContainer.appendChild(theDOM);
				});
			};
		};
		gController = new ClassController(new Date());
		gController.show();
	});
})();

