document.addEventListener('DOMContentLoaded', function(event) {
	init();
	
	function init() {
		getContent(8);
		getAnnotations(8);
	}

	// Function to request content via chapter number
	function getContent(chapter) {
		var contentChapter = sanitizeChapter(chapter);
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

	// Function to get initial annotation data
	function getAnnotations(chapter) {
		var contentChapter = sanitizeChapter(chapter);
		var contentRequest = new Request(location.origin + '/annotations/assets/data/ch'+ contentChapter +'.txt.xml', {
		});
		var annotations;

		fetch(contentRequest).then(function(response) {
			return response.text();
		}).then(function(text) {
			var parser = new DOMParser();
			var xmlDoc = parser.parseFromString(text, "text/xml");
			var annotations = xmlDoc.getElementsByTagName('span');

			displayAnnotations(annotations);
		});
	}

	function sanitizeChapter(chapter) {
		var contentChapter = chapter ? chapter.toString() : '';
		
		if(contentChapter.length = 1) {
			contentChapter = '0'+ contentChapter;
		}

		return contentChapter;
	}

	function displayAnnotations(annotations) {
		var contentContainer = document.querySelector('.contents').innerHTML;
		var charSeq, span, category;

		for(annotation of annotations){
			category = annotation.getAttribute('category')
			charSeq = annotation.getElementsByTagName('charseq');
			charSeqLength = charSeq[0]['textContent'].length;
			console.log(contentContainer.substr(charSeq[0].getAttribute('START'), charSeqLength), category);
		};
	}
});