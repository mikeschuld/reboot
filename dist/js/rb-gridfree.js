var RBGridFree = (function () {
    function RBGridFree($container) {
        this.$container = $container;
        $container.attr("data-gridfree-instance", RBGridFree.instanceCount);
        var style = (function () {
            var style = document.createElement("style");
            style.appendChild(document.createTextNode(""));
            style.type = "text/css";
            style.id = "css-gridfree-" + RBGridFree.instanceCount;
            $container[0].appendChild(style);
            return style;
        })();
        this.css = style.sheet;
        RBGridFree.instanceCount++;
    }
    RBGridFree.prototype.initialize = function () {
        this.$blocks = this.$container.children("[data-gridfree-fix],[data-gridfree-rel]");
        console.log("rb: initializing " + this.$blocks.length + " blocks");
        var fixedTotal = 0;
        var relativeTotal = 0;
        for (var b = 0; b < this.$blocks.length; b++) {
            $(this.$blocks[b]).attr("data-gridfree-block", RBGridFree.blockCount++);
        }
        this.$blocks.filter(function () {
            return $(this).data("gridfree-fix");
        }).each(function (b, block) {
            fixedTotal += $(block).data("gridfree-fix");
        });
        this.fixedTotal = fixedTotal;
        this.$blocks.filter(function () {
            return $(this).data("gridfree-rel");
        }).each(function (b, block) {
            relativeTotal += $(block).data("gridfree-rel");
        });
        this.relativeTotal = relativeTotal;
        console.log("rb: found " + fixedTotal + " fix and " + relativeTotal + " rel");
        this.resize();
        return this;
    };
    RBGridFree.prototype.resize = function () {
        while (this.css.cssRules.length) {
            this.css.deleteRule(0);
        }
        var pctScaler = (this.$container.width() - this.fixedTotal) / this.$container.width();
        for (var b = 0; b < this.$blocks.length; b++) {
            var block = this.$blocks[b];
            var rel = $(block).data("gridfree-rel");
            var pct = (rel / this.relativeTotal) * pctScaler * 100;
            var fix = $(block).data("gridfree-fix");
            var margin = $(block).css("marginLeft") || "0px";
            var width = "0px - 2 * " + margin;
            if (pct) {
                width += " + " + pct + "%";
            }
            if (fix) {
                width += " + " + fix + "px";
            }
            var instance = this.$container.data("gridfree-instance");
            var gridfreeBlock = $(block).data("gridfree-block");
            this.css.insertRule("[data-gridfree-instance = '" + instance + "'] [data-gridfree-block = '" + gridfreeBlock + "'] {\n\t\t\t\t\twidth: calc(" + width + ");\n\t\t\t\t}", 0);
        }
    };
    return RBGridFree;
}());
RBGridFree.instanceCount = 0;
RBGridFree.blockCount = 0;
$(function () {
    $(".rb-gridfree").each(function () {
        var gridfree = new RBGridFree($(this));
        gridfree.initialize();
        $(window).on("resize", function () {
            gridfree.resize();
        });
        var $tab = $(this).closest(".rb-tab");
        $tab.on("tab:open", function () {
            gridfree.resize();
        });
    });
});
//# sourceMappingURL=rb-gridfree.js.map