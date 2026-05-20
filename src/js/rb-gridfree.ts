import RBCore from "./rb-core.ts";

export class RBGridFree {
	static instanceCount: number = 0;
	static blockCount: number = 0;
	static instances: RBGridFree[] = new Array();
	static styleSheets: CSSStyleSheet[] = new Array();

	instanceId: string;
	css: CSSStyleSheet;

	constructor(public $container: JQuery, instanceId: string | null = null) {
		if (null == instanceId || "" === instanceId) {
			instanceId = RBGridFree.instanceCount.toString();

			$container.attr("data-gridfree-instance", instanceId);
		}

		let style: HTMLStyleElement;

		if ($(`#css-gridfree-${instanceId}`).length === 0) {
			style = (function() {
				let style = document.createElement("style");
				style.appendChild(document.createTextNode(""));
				style.type = "text/css";
				style.id = `css-gridfree-${instanceId}`;

				$(style).appendTo($("body"));

				return style;
			})();

			RBGridFree.styleSheets.push(<CSSStyleSheet>style.sheet);
		} else {
			style = <HTMLStyleElement>$(`#css-gridfree-${instanceId}`)[0];
		}

		this.instanceId = instanceId.toString();
		this.css = <CSSStyleSheet>style.sheet;

		RBGridFree.instanceCount++;
	}

	initialize(): RBGridFree {
		if (this.$container.is("tr")) {
			this.$container.closest("table").css("table-layout", "fixed");
		}

		if (null != this.css.$blocks) {
			console.log("rb: initializing " + this.css.$blocks.length + " blocks already initialized");

			return this;
		}

		this.css.$blocks = this.$container.children("[data-gridfree-fix],[data-gridfree-rel]");
		console.log("rb: initializing " + this.css.$blocks.length + " blocks");

		let fixedTotal = 0;
		let relativeTotal = 0;

		for (let b = 0; b < this.css.$blocks.length; b++) {
			if (null == $(this.css.$blocks[b]).attr("data-gridfree-block")) {
				$(this.css.$blocks[b]).attr("data-gridfree-block", RBGridFree.blockCount);
			}

			RBGridFree.blockCount++;
		}

		this.css.$blocks.filter(function(this: JQuery) {
			return $(this).data("gridfree-fix");
		}).each(function(b, block){
			fixedTotal += <number>$(block).data("gridfree-fix");
		});

		this.css.fixedTotal = fixedTotal;

		this.css.$blocks.filter(function(this: JQuery) {
			return $(this).data("gridfree-rel");
		}).each(function(b, block){
			relativeTotal += <number>$(block).data("gridfree-rel");
		});

		this.css.relativeTotal = relativeTotal;

		console.log(`rb: found ${fixedTotal} fix and ${relativeTotal} rel`);

		RBGridFree.instances.push(this);

		return this;
	}

	resetResize(): void {
		this.css.resized = false;
	}

	resize(): void {
		if (this.css.resized) {
			return;
		}

		this.css.resized = true;

		console.log("rb: resizing " + this.css.$blocks.length + " blocks in instance " + this.instanceId);

		while (this.css.cssRules.length) {
			this.css.deleteRule(0);
		}

		let containerWidth = this.$container.width();
		let pctWidth = (containerWidth - this.css.fixedTotal);

		for (let b = 0; b < this.css.$blocks.length; b++) {
			let block = this.css.$blocks[b];

			let rel = <number>$(block).data("gridfree-rel");
			let pct = (rel / this.css.relativeTotal) * pctWidth;
			let fix = $(block).data("gridfree-fix");
			let margin = $(block).css("marginLeft") || "0px";

			let width = "0px - 2 * " + margin;

			if (pct) {
				width += " + " + pct + "px";
			}

			if (fix) {
				width += " + " + fix + "px";
			}

			let instance = this.$container.data("gridfree-instance");
			let gridfreeBlock = $(block).data("gridfree-block");

			this.css.insertRule(
				`[data-gridfree-instance = "${instance}"] [data-gridfree-block = "${gridfreeBlock}"] {
					width: calc(${width});
				}`,
				0);
		}
	}
}

RBCore.observe(".rb-gridfree", function(element: HTMLElement) {
	setTimeout(function(){
		let instanceId = $(element).data("gridfree-instance");

		let gridfree = new RBGridFree($(element), instanceId);
		gridfree.initialize();
		gridfree.resize();

		// let $tab = $(element).closest(".rb-tab");
		// $tab.on("tab:open", function() {
		// 	gridfree.resetResize();
		// 	gridfree.resize();
		// });
	}, 0);
});

$(window).resize(function () {
	RBGridFree.instances.forEach(function (instance) {
		instance.resetResize();
	});
	RBGridFree.instances.forEach(function (instance) {
		instance.resize();
	});
});