/*
    jQuery Mobile Site Builder v1.0
    Author: Sam Deering 2012
    Site: jquery4u.com
*/

$(document).on("mobileinit", function()
{
    $.extend($.mobile ,
    {
        //http://jquerymobile.com/branches/1.2/docs/pages/page-transitions.html
        "defaultPageTransition" : "none"  //fade, slide, slidefade, turn, flip, pop, flow, slideup, slidedown, none

    });
});