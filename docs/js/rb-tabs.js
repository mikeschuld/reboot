var rb_tabs = function($tabset) {
	this.$tabset = $tabset;
}

rb_tabs.prototype.initialize = function() {
	var $tabs = this.$tabset.children("[data-rb-tab]");

	var tabIds = $tabs.map(function() {
		return $(this).data("rb-tab");
	}).get();

	for(var t = 0; t < $tabs.length; t++) {
		var tab = $tabs[t];

		$(tab).click(function() {
			$(this).trigger("tab:open");
			$($(this).data("rb-tab")).trigger("tab:open");
		});

		$(tab).on("tab:open", function(e) {
			$tabs.removeClass("rb-open");

			for(var id = 0; id < tabIds.length; id++) {
				$(tabIds[id]).removeClass("rb-open");
			}

			$(this).addClass("rb-open");
			$($(this).data("rb-tab")).addClass("rb-open");
		});
	}
}

$(function() {
	$(".rb-tabset").each(function() {
		var tabs = new rb_tabs($(this));
		tabs.initialize();
	});
});