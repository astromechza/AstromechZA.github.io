$(function(){
    $('.post-content img').wrap(function(){
        return '<a href="' + this.src + '" title="' + this.alt + '"></a>'
    });
});