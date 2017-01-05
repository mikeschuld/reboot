class RBGridFree {
	static instanceCount: number = 0;
	static blockCount: number = 0;

	$blocks: JQuery;
	css: CSSStyleSheet;

	fixedTotal: number;
	relativeTotal: number;

	constructor(public $container: JQuery) {
		$container.attr("data-gridfree-instance", RBGridFree.instanceCount);

		let style = (function() {
			let style = document.createElement("style");
			style.appendChild(document.createTextNode(""));
			style.type = "text/css";
			style.id = `css-gridfree-${RBGridFree.instanceCount}`;

			$container[0].appendChild(style);

			return style;
		})();

		this.css = <CSSStyleSheet>style.sheet;

		RBGridFree.instanceCount++;
	}

	initialize(): RBGridFree {
		this.$blocks = this.$container.children("[data-gridfree-fix],[data-gridfree-rel]");
		console.log("rb: initializing " + this.$blocks.length + " blocks");

		let fixedTotal = 0;
		let relativeTotal = 0;

		for (let b = 0; b < this.$blocks.length; b++) {
			$(this.$blocks[b]).attr("data-gridfree-block", RBGridFree.blockCount++);
		}

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

		console.log(`rb: found ${fixedTotal} fix and ${relativeTotal} rel`);

		this.resize();

		return this;
	}

	resize(): void {
		while (this.css.cssRules.length) {
			this.css.deleteRule(0);
		}

		let pctScaler = (this.$container.width() - this.fixedTotal) / this.$container.width();

		for (let b = 0; b < this.$blocks.length; b++) {
			let block = this.$blocks[b];

			let rel = <number>$(block).data("gridfree-rel");
			let pct = (rel / this.relativeTotal) * pctScaler * 100;
			let fix = $(block).data("gridfree-fix");
			let margin = $(block).css("marginLeft") || "0px";

			let width = "0px - 2 * " + margin;

			if (pct) {
				width += " + " + pct + "%";
			}

			if (fix) {
				width += " + " + fix + "px";
			}

			let instance = this.$container.data("gridfree-instance");
			let gridfreeBlock = $(block).data("gridfree-block");

			this.css.insertRule(
				`[data-gridfree-instance = '${instance}'] [data-gridfree-block = '${gridfreeBlock}'] {
					width: calc(${width});
				}`,
				0);
		}
	}
}

$(function() {
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