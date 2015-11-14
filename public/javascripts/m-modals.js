var mod = $('#whyModal')
	component = $('.component');

$(function() {
    FastClick.attach(document.body);
    FastClick.attach(component);
});

component.bind('touchend click', function(e){		
	head_text = $(this).find('.head-text').text()
	body_text = $(this).find('.body-text').text()
	img = $(this).find('img.tainner').clone();
	

	mod.modal('show');
		if(head_text == '' && body_text == ''){
			img.removeClass('hidden');
			mod.on('shown.bs.modal', function(){			
				mod.find('.modal-body p').html(img);
			})
		}
		else{
			mod.on('shown.bs.modal', function(){
				mod.find('.modal-title').text(head_text)
				mod.find('.modal-body p').text(body_text);
			})
		}	

	mod.on('hidden.bs.modal', function(){
		img.addClass('hidden');
	});
		
		
	e.preventDefault();
});
