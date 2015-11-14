var length = $('.form-control').length
$('#conditionModal').modal('show');

$('.form-control').on('blur', function(){
	if($(this).val() == '')
		$(this).parent().addClass("has-error");
	else
		$(this).parent().removeClass("has-error").addClass("has-success");
});

$('#btn-register').click(function(){
	pass = 0;
	checkNull();
	confirmData('#btn-register', pass, length);
});

$('#btn-payment').click(function(){
	pass = 0;
	checkNull();
	confirmData('#btn-payment', pass, length);
});

$('#print').click(function(){
		window.print();
});

function checkNull(){
	$('.form-control').each(function(){
		if($(this).val() != ''){
			pass++;
		}
		else
			$(this).parent().addClass("has-error");
	});
}

function confirmData(btn, pass, length){
	btn = btn+'-trick';
	if(length == pass){
		$('#confirmModal').modal('show');
		$('#btn-confirm').click(function(){
			$(btn).trigger("click");
		});
	}
	else
		$('.alert').removeClass('hidden').addClass('show');
}
