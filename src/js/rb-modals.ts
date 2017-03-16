class RBModal {
	static open: number = 0;
	static $backdrop: JQuery;

	constructor(private $trigger: JQuery) {
		if (RBModal.$backdrop === undefined) {
			RBModal.$backdrop = $("<div class='rb-modal-backdrop'>");
			RBModal.$backdrop.appendTo($("body"));
		}
	}

	initialize(): RBModal {
		let selector: string = this.$trigger.data("rb-modal-open");
		let event: string = this.$trigger.data("rb-event");
		let $modal = $(selector);
		let $close = $modal.find("[data-rb-modal-close]");

		this.$trigger.on(event, function(this: Element) {
			$modal.trigger("modal:open");
		});

		$close.on("click", function(this: Element) {
			$modal.trigger("modal:close");
		});

		$modal.on("modal:open", function(this: Element) {
			RBModal.open++;
			$(this).addClass("rb-open");

			RBModal.$backdrop.addClass("rb-open");
		});

		$modal.on("modal:close", function(this: Element) {
			RBModal.open--;
			$(this).removeClass("rb-open");

			if (RBModal.open <= 0) {
				RBModal.$backdrop.removeClass("rb-open");
			}
		});

		let $outerContainer = $modal.parents(".rb-container, .rb-container-dark").last();
		$modal.appendTo($outerContainer);

		return this;
	}
}

$(function() {
	$("[data-rb-modal-open]").each(function(this: Element) {
		let modal: RBModal = new RBModal($(this));
		modal.initialize();
	});
});