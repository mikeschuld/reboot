export class RBCore {
	// http://ryanmorr.com/using-mutation-observers-to-watch-for-element-availability/
	private static observer: MutationObserver;
	private static listeners: Array<RBCore.RBListener> = [];

	static initialize() {
		RBCore.observer = new MutationObserver(RBCore.observeCheck);
		RBCore.observer.observe(window.document.documentElement, {
			childList: true,
			subtree: true
		});
	}

	public static observe(selector: string, fn: Function) {
		let listener: RBCore.RBListener = {
			Selector: selector,
			Function: fn
		};

		RBCore.listeners.push(listener);

		if (!RBCore.observer) {
			RBCore.initialize();
		}

		// Check if the element is currently in the DOM
		RBCore.observeCheck();
	}

	private static observeCheck() {
		// Check the DOM for elements matching a stored selector
		for (let i = 0, len = RBCore.listeners.length, listener, elements: NodeListOf<Element>; i < len; i++) {
			listener = RBCore.listeners[i];

			// Query for elements matching the specified selector
			elements = window.document.querySelectorAll(listener.Selector);

			for (let j = 0, jLen = elements.length, element: any; j < jLen; j++) {
				element = elements[j];

				// Make sure the callback isn't invoked with the same element more than once
				if (!element.observed) {
					element.observed = true;
					// Invoke the callback with the element
					listener.Function.call(element, element);
				}
			}
		}
	}
}

export namespace RBCore {
	export class RBListener {
		Selector: string;
		Function: Function;
	}
}

export default RBCore;