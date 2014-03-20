$(function(){
    $('.post-content img').wrap(function(){
        return '<a href="' + this.src + '" title="' + this.alt + '"></a>'
    });

    $('table.highlighttable').wrap(function(){
        return '<div class="codediv"></div>'
    });
});