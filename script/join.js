function fieldError(input_id, message) {
	console.log("fieldError");
	$("#" + input_id + "-field").addClass('has-error');
	$(".form-inline:last").after("<label class='bottom-error'>" + message + "</label>");
}

function emptyFields(message) {
	$('.form-inline:last').after("<p class='bottom-error'>" + message + "</p>");
}