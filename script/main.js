$(document).ready(function(){

	$(".navbar-toggle").click(function() {

		$(".navbar-toggle").toggleClass("active");

	})

})

function encryptData() {
	var hash = CryptoJS.SHA256($("#password").val());
	$("#password").val(hash.toString(CryptoJS.enc.Base64));
}