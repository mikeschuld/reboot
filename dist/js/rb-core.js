var RBCore = (function () {
    function RBCore() {
    }
    RBCore.initialize = function () {
        RBCore.observer = new MutationObserver(RBCore.observeCheck);
        RBCore.observer.observe(window.document.documentElement, {
            childList: true,
            subtree: true
        });
    };
    RBCore.observe = function (selector, fn) {
        var listener = {
            Selector: selector,
            Function: fn
        };
        RBCore.listeners.push(listener);
        if (!RBCore.observer) {
            RBCore.initialize();
        }
        // Check if the element is currently in the DOM
        RBCore.observeCheck();
    };
    RBCore.observeCheck = function () {
        // Check the DOM for elements matching a stored selector
        for (var i = 0, len = RBCore.listeners.length, listener = void 0, elements = void 0; i < len; i++) {
            listener = RBCore.listeners[i];
            // Query for elements matching the specified selector
            elements = window.document.querySelectorAll(listener.Selector);
            for (var j = 0, jLen = elements.length, element = void 0; j < jLen; j++) {
                element = elements[j];
                // Make sure the callback isn't invoked with the same element more than once
                if (!element.observed) {
                    element.observed = true;
                    // Invoke the callback with the element
                    listener.Function.call(element, element);
                }
            }
        }
    };
    RBCore.listeners = [];
    return RBCore;
}());
(function (RBCore) {
    var RBListener = (function () {
        function RBListener() {
        }
        return RBListener;
    }());
    RBCore.RBListener = RBListener;
})(RBCore || (RBCore = {}));
//# sourceMappingURL=rb-core.js.map