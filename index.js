let gController = null;
(function () {
	'use strict';
	document.addEventListener('DOMContentLoaded', () => {
		const ClassController = function (/* theNow */) {
			const self = this;
			self.util = {
				assert(theAssertion) {
					if (theAssertion !== true) {
						alert('assertion failed'); // eslint-disable-line no-alert
					}
				},
				createElement(theTag, theProperties, theClassList) {
					const returnValue = document.createElement(theTag);
					if ((typeof undefined !== typeof theProperties) && (theProperties !== null)) {
						Object.keys(theProperties).forEach(theProperty => {
							returnValue[theProperty] = theProperties[theProperty];
						});
					}

					if ((typeof undefined !== typeof theClassList) && (theClassList !== null)) {
						theClassList.forEach(theClass => {
							returnValue.classList.add(theClass);
						});
					}

					return returnValue;
				},
			};

			self.buttonDisable = function (theButton) {
				theButton.classList.remove('normal');
				theButton.classList.add('busy');
			};

			self.buttonEnable = function (theButton) {
				theButton.classList.remove('busy');
				theButton.classList.add('normal');
			};

			self.model = {
				enabled: true,
			};

			self.show = function () {
				const aDOMContainer = document.querySelector('#container');
				const aDOMFooter = self.util.createElement('div', null, ['footer']);
				const aDOMLink = self.util.createElement('div');
				const aDOMHref = self.util.createElement('a', {href: 'https://github.com/isghe/satoshieuro-eurobitcoin_converter', textContent: 'github'});
				aDOMLink.append(aDOMHref);
				const aAddress = '1ig1p1awfjS5bQxy2s33AD8sVspy4YFMD';
				const aDOMBitcoin = self.util.createElement('div', {textContent: aAddress}, ['bitcoin']);
				const aDOMQR = self.util.createElement('img', {
					src: aAddress + '.png', alt: aAddress, width: '200', height: '200',
				});
				[aDOMLink, aDOMQR, aDOMBitcoin].forEach(theDOM => {
					aDOMFooter.append(theDOM);
				});

				const aDOMInputSatoshiEuro = self.util.createElement('input', {
					type: 'text', value: '', maxlength: 30, size: 30,
				}, ['input_text']);

				const aDOMWrapResult = self.util.createElement('div', null, ['wrap-result']);
				const aDOMLabelResult = self.util.createElement('span', {textContent: 'Result:'});
				const aDOMValueResult = self.util.createElement('span', null, ['result']);

				aDOMWrapResult.append(aDOMLabelResult, aDOMValueResult);
				const aDOMButtonConvert = self.util.createElement('div', {
					textContent: 'Convert',
					onclick(/* theEvent */) {
						if (self.model.enabled === true) {
							self.model.enabled = false;
							self.buttonDisable(aDOMButtonConvert);
							aDOMValueResult.textContent = 100_000_000 / aDOMInputSatoshiEuro.value;
							setTimeout(() => {
								self.buttonEnable(aDOMButtonConvert);
								self.model.enabled = true;
							}, 1000);
						}
					},
				}, ['ig_button', 'normal']);

				aDOMContainer.append(aDOMInputSatoshiEuro, aDOMButtonConvert, aDOMWrapResult, aDOMFooter);
			};
		};

		gController = new ClassController(new Date());
		gController.show();
	});
})();

