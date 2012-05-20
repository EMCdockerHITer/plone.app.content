(function($){

/* reload folder contents listings */
function replaceFolderContentsTable(overrides, prevent) {
    var fCF = $("form[name=folderContentsForm]");
    var defaults = {
        "sort_on": fCF.find("input[name=sort_on]").first().val(),
        "pagenumber": fCF.find("input[name=pagenumber]").first().val(),
        "show_all": fCF.find("input[name=show_all]").first().val()
    };
    $.get('foldercontents_get_table', $.extend(defaults, overrides), function(data) {
        $("#folderlisting-main-table").replaceWith(data);
        // fix up links generated by batching
        var orig_template = $("form[name=folderContentsForm] input[name=orig_template]").first().val();
        $("div.listingBar a").each(function(){
            $(this).attr("href", $(this).attr("href").replace(/foldercontents_get_table/, orig_template));
        });
        $(initializeDnDReorder('#listing-table'));
    });
}

$(document).ready(function(){

    /* folder contents table loading actions */
    var ccore = $("#content-core");
    ccore.delegate("#foldercontents-show-all", "click", function(event) {
        event.preventDefault();
        replaceFolderContentsTable({ "show_all": "True", "pagenumber": "1" });
    });
    ccore.delegate("#foldercontents-show-batched", "click", function(event) {
        event.preventDefault();
        replaceFolderContentsTable({ "show_all": "False" });
    });
    ccore.delegate("#foldercontents-title-column", "click", function(event) {
        replaceFolderContentsTable({ "sort_on": "sortable_title" });
    });
    ccore.delegate("#foldercontents-modified-column", "click", function(event) {
        replaceFolderContentsTable({ "sort_on": "modified" });
    });
    ccore.delegate("#foldercontents-status-column", "click", function(event) {
        replaceFolderContentsTable({ "sort_on": "review_state" });
    });
    ccore.delegate("#foldercontents-selectall", "click", function(event) {
        event.preventDefault();
        replaceFolderContentsTable({ "select": "screen" });
    });
    ccore.delegate("#foldercontents-selectall-completebatch", "click", function(event) {
        event.preventDefault();
        replaceFolderContentsTable({ "select": "all" });
    });
    ccore.delegate("#foldercontents-clearselection", "click", function(event) {
        event.preventDefault();
        replaceFolderContentsTable({ "select": "none" });
    });
    ccore.delegate("div.listingBar a", "click", function(event) {
        event.preventDefault();
        var link = $(this).attr("href");
        var page = decodeURI((RegExp("pagenumber\:int" + '=' + '(.+?)(&|$)').exec(link)||[,null])[1]);
        replaceFolderContentsTable({ "pagenumber": page });
    });

});

})(jQuery);