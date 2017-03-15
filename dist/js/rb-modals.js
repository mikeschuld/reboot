var RBModal = (function () {
    function RBModal($trigger) {
        this.$trigger = $trigger;
    }
    RBModal.prototype.initialize = function () {
        var selector = this.$trigger.data("rb-modal");
        var event = this.$trigger.data("rb-event");
        var $modal = $(selector);
        this.$trigger.on(event, function () {
            $modal.trigger("modal:open");
        });
        $modal.on("modal:open", function () {
            $(this).addClass("rb-open");
        });
        return this;
    };
    return RBModal;
}());
$(function () {
    $("[data-rb-modal]").each(function () {
        var modal = new RBModal($(this));
        modal.initialize();
    });
});
//# sourceMappingURL=rb-modals.js.map