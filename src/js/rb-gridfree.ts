class RBGridFree {
	$blocks: JQuery;

	fixedTotal: number;
	relativeTotal: number;

	constructor(public $container: JQuery) {}

	initialize(): RBGridFree {
		this.$blocks = this.$container.children("[data-gridfree-fix],[data-gridfree-rel]");
		console.log("rb: initializing " + this.$blocks.length + " blocks");

		let fixedTotal = 0;
		let relativeTotal = 0;

		this.$blocks.filter(function(this: JQuery) {
			return $(this).data("gridfree-fix");
		}).each(function(b, block){
			fixedTotal += <number>$(block).data("gridfree-fix");
		});

		this.fixedTotal = fixedTotal;

		this.$blocks.filter(function(this: JQuery) {
			return $(this).data("gridfree-rel");
		}).each(function(b, block){
			relativeTotal += <number>$(block).data("gridfree-rel");
		});

		this.relativeTotal = relativeTotal;

		this.$blocks.filter(function(this: JQuery) {
			return $(this).data("gridfree-rel");
		}).each(function(b, block){
			let rel = <number>$(block).data("gridfree-rel");
			$(block).attr("data-gridfree-rel-pct", rel / relativeTotal);
		});

		console.log(`rb: found ${fixedTotal} fix and ${relativeTotal} rel`);

		this.resize();

		return this;
	}

	resize(): void {
		let pctScaler = (this.$container.width() - this.fixedTotal) / this.$container.width();

		for (let b = 0; b < this.$blocks.length; b++) {
			let block = this.$blocks[b];

			let pct = $(block).data("gridfree-rel-pct") * pctScaler * 100;
			let fix = $(block).data("gridfree-fix");
			let margin = $(block).css("marginLeft") || "0px";

			let width = "0px - 2 * " + margin;

			if (pct) {
				width += " + " + pct + "%";
			}

			if (fix) {
				width += " + " + fix + "px";
			}

			$(block).css("width", "calc(" + width + ")");
		}
	}
}

$(function(){
	$(".rb-gridfree").each(function(this: JQuery) {
		let gridfree = new RBGridFree($(this));
		gridfree.initialize();

		$(window).on("resize", function() {
			gridfree.resize();
		});

		let $tab = $(this).closest(".rb-tab");
		$tab.on("tab:open", function() {
			gridfree.resize();
		});
	});
});