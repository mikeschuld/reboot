var RBGridFree = (function () {
    function RBGridFree($container) {
        this.$container = $container;
    }
    RBGridFree.prototype.initialize = function () {
        this.$blocks = this.$container.children("[data-rb-gf-fix],[data-rb-gf-rel]");
        console.log("rb: initializing " + this.$blocks.length + " blocks");
        var fixedTotal = 0;
        var relativeTotal = 0;
        this.$blocks.filter(function () {
            return $(this).data("rb-gf-fix");
        }).each(function (b, block) {
            fixedTotal += $(block).data("rb-gf-fix");
        });
        this.fixedTotal = fixedTotal;
        this.$blocks.filter(function () {
            return $(this).data("rb-gf-rel");
        }).each(function (b, block) {
            relativeTotal += $(block).data("rb-gf-rel");
        });
        this.relativeTotal = relativeTotal;
        this.$blocks.filter(function () {
            return $(this).data("rb-gf-rel");
        }).each(function (b, block) {
            var rel = $(block).data("rb-gf-rel");
            $(block).attr("data-rb-gf-rel-pct", rel / relativeTotal);
        });
        console.log("rb: found " + fixedTotal + " fix and " + relativeTotal + " rel");
        this.resize();
        return this;
    };
    RBGridFree.prototype.resize = function () {
        var pctScaler = (this.$container.width() - this.fixedTotal) / this.$container.width();
        for (var b = 0; b < this.$blocks.length; b++) {
            var block = this.$blocks[b];
            var pct = $(block).data("rb-gf-rel-pct") * pctScaler * 100;
            var fix = $(block).data("rb-gf-fix");
            var margin = $(block).css("marginLeft") || "0px";
            var width = "0px - 2 * " + margin;
            if (pct) {
                width += " + " + pct + "%";
            }
            if (fix) {
                width += " + " + fix + "px";
            }
            $(block).css("width", "calc(" + width + ")");
        }
    };
    return RBGridFree;
}());
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