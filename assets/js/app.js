document.addEventListener('DOMContentLoaded', function(event) {
	fetch('../data/ch08.txt').then(function(response) {
		return response.blob();
	}).then(function(myBlob) {
		console.log(myBlob);
	});
});