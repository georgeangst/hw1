'use strict';

(function(window, $){

  function show(pageId){
    var $page = $("#" + pageId);

    if( $page.length == 0 ) {
      console.log("page not found", pageId);
      return;
    }

    $('.page').removeClass("active");
    $('#' + pageId).addClass("active");
  }

  function loadPage(pageId){

    var $page = $("#" + pageId);
    var src = $page.attr("data-src");

    if( src && $page.is(':empty')){
      $.get(src, "html")
        .done(function(html){
          $page.html(html);
          show(pageId);
        })
        .fail(function(){
          console.log("failed get:" + src);
        });
    }
    else {
      show(pageId);
    }

  }

  function onHashChange(){
    var hash = location.hash || "#" + $(".active").attr('id');
    var regEx = /#([-0-9A-Za-z]+)(\:(.+))?/;
    var match = regEx.exec(hash);

    hash = match[1];
    loadPage(hash);
  }

  $(window).on("hashchange", onHashChange);

  $(onHashChange); // call it for the initialization

})(this, jQuery);