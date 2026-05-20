var RBModal = (function () {
    function RBModal($trigger) {
        this.$trigger = $trigger;
        if (RBModal.$backdrop === undefined) {
            RBModal.$backdrop = $("<div class='rb-modal-backdrop'>");
            RBModal.$backdrop.appendTo($("body"));
        }
    }
    RBModal.prototype.initialize = function () {
        var selector = this.$trigger.data("rb-modal-open");
        var event = this.$trigger.data("rb-event");
        var $modal = $(selector);
        var $close = $modal.find("[data-rb-modal-close]");
        this.$trigger.on(event, function () {
            $modal.trigger("modal:open");
        });
        $close.on("click", function () {
            $modal.trigger("modal:close");
        });
        $modal.on("modal:open", function () {
            RBModal.open++;
            $(this).addClass("rb-open");
            RBModal.$backdrop.addClass("rb-open");
        });
        $modal.on("modal:close", function () {
            RBModal.open--;
            $(this).removeClass("rb-open");
            if (RBModal.open <= 0) {
                RBModal.$backdrop.removeClass("rb-open");
            }
        });
        var $outerContainer = $modal.parents(".rb-container, .rb-container-dark").last();
        $modal.appendTo($outerContainer);
        return this;
    };
    RBModal.open = 0;
    return RBModal;
}());
$(function () {
    $("[data-rb-modal-open]").each(function () {
        var modal = new RBModal($(this));
        modal.initialize();
    });
});
//# sourceMappingURL=rb-modals.js.map