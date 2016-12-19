class RBTabs {
	constructor(private $tabset: JQuery) { }

	initialize(): RBTabs {
		let $tabs: JQuery = this.$tabset.children("[data-rb-tab]");

		for (let t = 0; t < $tabs.length; t++) {
			let tab = $tabs[t];

			$(tab).click(function(this: JQuery) {
				$(this).trigger("tab:open");
				$($(this).data("rb-tab")).trigger("tab:open");
			});

			$(tab).on("tab:open", function(this: JQuery) {
				$tabs.removeClass("rb-open");

				for (let t = 0; t < $tabs.length; t++) {
					let rbTabSelector = <string>$($tabs[t]).data("rb-tab");

					$(rbTabSelector).removeClass("rb-open");
				}

				$(this).addClass("rb-open");
				$($(this).data("rb-tab")).addClass("rb-open");
			});
		}

		return this;
	}
}

$(function() {
	$(".rb-tabset").each(function(this: JQuery) {
		let tabs = new RBTabs($(this));
		tabs.initialize();
	});
});