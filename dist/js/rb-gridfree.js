var RBGridFree = (function () {
    function RBGridFree($container, instanceId) {
        if (instanceId === void 0) { instanceId = null; }
        this.$container = $container;
        if (null == instanceId || "" === instanceId) {
            instanceId = RBGridFree.instanceCount.toString();
            $container.attr("data-gridfree-instance", instanceId);
        }
        var style;
        if ($("#css-gridfree-" + instanceId).length === 0) {
            style = (function () {
                var style = document.createElement("style");
                style.appendChild(document.createTextNode(""));
                style.type = "text/css";
                style.id = "css-gridfree-" + instanceId;
                $(style).appendTo($("body"));
                return style;
            })();
            RBGridFree.styleSheets.push(style.sheet);
        }
        else {
            style = $("#css-gridfree-" + instanceId)[0];
        }
        this.instanceId = instanceId.toString();
        this.css = style.sheet;
        RBGridFree.instanceCount++;
    }
    RBGridFree.prototype.initialize = function () {
        if (this.$container.is("tr")) {
            this.$container.closest("table").css("table-layout", "fixed");
        }
        if (null != this.css.$blocks) {
            console.log("rb: initializing " + this.css.$blocks.length + " blocks already initialized");
            return this;
        }
        this.css.$blocks = this.$container.children("[data-gridfree-fix],[data-gridfree-rel]");
        console.log("rb: initializing " + this.css.$blocks.length + " blocks");
        var fixedTotal = 0;
        var relativeTotal = 0;
        for (var b = 0; b < this.css.$blocks.length; b++) {
            if (null == $(this.css.$blocks[b]).attr("data-gridfree-block")) {
                $(this.css.$blocks[b]).attr("data-gridfree-block", RBGridFree.blockCount);
            }
            RBGridFree.blockCount++;
        }
        this.css.$blocks.filter(function () {
            return $(this).data("gridfree-fix");
        }).each(function (b, block) {
            fixedTotal += $(block).data("gridfree-fix");
        });
        this.css.fixedTotal = fixedTotal;
        this.css.$blocks.filter(function () {
            return $(this).data("gridfree-rel");
        }).each(function (b, block) {
            relativeTotal += $(block).data("gridfree-rel");
        });
        this.css.relativeTotal = relativeTotal;
        console.log("rb: found " + fixedTotal + " fix and " + relativeTotal + " rel");
        RBGridFree.instances.push(this);
        return this;
    };
    RBGridFree.prototype.resetResize = function () {
        this.css.resized = false;
    };
    RBGridFree.prototype.resize = function () {
        if (this.css.resized) {
            return;
        }
        this.css.resized = true;
        console.log("rb: resizing " + this.css.$blocks.length + " blocks in instance " + this.instanceId);
        while (this.css.cssRules.length) {
            this.css.deleteRule(0);
        }
        var containerWidth = this.$container.width();
        var pctWidth = (containerWidth - this.css.fixedTotal);
        for (var b = 0; b < this.css.$blocks.length; b++) {
            var block = this.css.$blocks[b];
            var rel = $(block).data("gridfree-rel");
            var pct = (rel / this.css.relativeTotal) * pctWidth;
            var fix = $(block).data("gridfree-fix");
            var margin = $(block).css("marginLeft") || "0px";
            var width = "0px - 2 * " + margin;
            if (pct) {
                width += " + " + pct + "px";
            }
            if (fix) {
                width += " + " + fix + "px";
            }
            var instance = this.$container.data("gridfree-instance");
            var gridfreeBlock = $(block).data("gridfree-block");
            this.css.insertRule("[data-gridfree-instance = \"" + instance + "\"] [data-gridfree-block = \"" + gridfreeBlock + "\"] {\n\t\t\t\t\twidth: calc(" + width + ");\n\t\t\t\t}", 0);
        }
    };
    RBGridFree.instanceCount = 0;
    RBGridFree.blockCount = 0;
    RBGridFree.instances = new Array();
    RBGridFree.styleSheets = new Array();
    return RBGridFree;
}());
RBCore.observe(".rb-gridfree", function (element) {
    setTimeout(function () {
        var instanceId = $(element).data("gridfree-instance");
        var gridfree = new RBGridFree($(element), instanceId);
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
//# sourceMappingURL=rb-gridfree.js.map