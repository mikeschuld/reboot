var RBTabs = (function () {
    function RBTabs($tabset) {
        this.$tabset = $tabset;
    }
    RBTabs.prototype.initialize = function () {
        var $tabs = this.$tabset.children("[data-rb-tab]");
        for (var t = 0; t < $tabs.length; t++) {
            var tab = $tabs[t];
            $(tab).click(function () {
                $(this).trigger("tab:open");
                $($(this).data("rb-tab")).trigger("tab:open");
            });
            $(tab).on("tab:open", function () {
                $tabs.removeClass("rb-open");
                for (var t_1 = 0; t_1 < $tabs.length; t_1++) {
                    var rbTabSelector = $($tabs[t_1]).data("rb-tab");
                    $(rbTabSelector).removeClass("rb-open");
                }
                $(this).addClass("rb-open");
                $($(this).data("rb-tab")).addClass("rb-open");
            });
        }
        return this;
    };
    return RBTabs;
}());
$(function () {
    $(".rb-tabset").each(function () {
        var tabs = new RBTabs($(this));
        tabs.initialize();
    });
});
//# sourceMappingURL=rb-tabs.js.map