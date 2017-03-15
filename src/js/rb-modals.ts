class RBModal {
	constructor(private $trigger: JQuery) { }

	initialize(): RBModal {
		let selector: string = this.$trigger.data("rb-modal");
		let event: string = this.$trigger.data("rb-event");
		let $modal = $(selector);

		this.$trigger.on(event, function(this: Element) {
			$modal.trigger("modal:open");
		});

		$modal.on("modal:open", function(this: Element) {
			$(this).addClass("rb-open");
		});

		return this;
	}
}

$(function() {
	$("[data-rb-modal]").each(function(this: Element) {
		let modal: RBModal = new RBModal($(this));
		modal.initialize();
	});
});