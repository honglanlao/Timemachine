  $(function() {
    $("#menu").menu({
    
    });
    $("#menu").removeClass('ui-widget-content');
    $('ul#menu li').click(function(){
    	$(this).addClass('selected').siblings().removeClass('selected');	
    });
  
  });
  