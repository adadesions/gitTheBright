var path = window.location.pathname

$('li').each(function(){
    ele = $(this).children('a').attr('href');                
      if($(this).hasClass('dropdown')){
        console.log($(this).find("a.star").attr('href'));             
        if($(this).find('a.star').attr('href') == path)
          $(this).addClass('active');
      } 
      else if(ele == path){
        $(this).addClass("active");
      }
  })