document.addEventListener('DOMContentLoaded', function(event) {
	getContent(8);

	// Function to request content via chapter number
	function getContent(chapter) {

		var contentChapter = chapter ? chapter.toString() : '';

		if(contentChapter.length = 1) {
			contentChapter = '0'+ contentChapter;
		}

		var contentRequest = new Request(location.origin + '/annotations/assets/data/ch'+ contentChapter +'.txt', {
			headers: new Headers({
				'Content-Type': 'text/plain'
			})
		});

		fetch(contentRequest).then(function(response) {
			return response.text();
		}).then(function(text) {
			var contentContainer = document.querySelector('.contents');
			contentContainer.innerHTML = text;
		});
	}
});