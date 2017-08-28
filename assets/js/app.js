document.addEventListener('DOMContentLoaded', function(event) {
	var annotationHandler = (function() {
		var annotations = new Set();
		var node = [];

		return {
			getAnnotations: function(chapter) {
				var contentChapter = sanitizeChapter(chapter);
				var contentRequest = new Request(location.origin + '/annotations/assets/data/ch'+ contentChapter +'.txt.xml', {
				});

				fetch(contentRequest).then(function(response) {
					return response.text();
				}).then(function(text) {
					var parser = new DOMParser();
					var xmlDoc = parser.parseFromString(text, "text/xml");
					var annotationsIterator = xmlDoc.evaluate('//span', xmlDoc, null, XPathResult.ANY_TYPE, null );
					var charseq;

					try {
						var annotationNode = annotationsIterator.iterateNext();
						
						while (annotationNode) {
							var charseq = annotationNode.getElementsByTagName('charseq');
							var cat     = annotationNode.getAttribute('category').toLowerCase();

							node = {
								'category'  : cat,
								'text'      : annotationNode.textContent,
								'textLength': annotationNode.textContent.length,
								'charseq'   : annotationNode.getElementsByTagName('charseq')
							}
							annotations.add(node)
						  	
						  	annotationNode = annotationsIterator.iterateNext();
						}
					  }
					  catch (e) {
						console.log( 'Error: Document tree modified during iteration ' + e );
					  }

					  return annotations;
				}).then(function(annotations){
					annotationHandler.displayAnnotations(annotations);
				});

				return annotations;
			},

			displayAnnotations: function(annotations) {
				var contentContainer = document.querySelector('.contents').innerHTML;
				var newContent, start, end;

				annotations.forEach(function(annotation) {
					start = annotation.charseq[0].getAttribute('START');
					end = annotation.charseq[0].getAttribute('END');
					//console.log(newContent.substring(start, annotation.textLength));
					newContent = contentContainer.replace(annotation.text, '<span>'+ annotation.text + '</span>');
				});

				console.log(newContent);

				document.querySelector('.contents').innerHTML = newContent;

				/*console.log(contentContainer.replace(/alice/g, 'bob'));
				for(annotation of annotations){
					console.log(annotation);
					category = annotation.getAttribute('category').toLowerCase();
					charSeq = annotation.getElementsByTagName('charseq');
					charSeqLength = charSeq[0]['textContent'].length;
		
					terms.push(contentContainer.substr(charSeq[0].getAttribute('START'), charSeqLength), category);
					contentContainer.replace(/alice/g, 'bob');
				};*/

			},
			
			insertAnnotations: function( values ){
				return annotations.push(values);
			},

			updateAnnotations: function( values ){
				console.log(values);
			},

			removeAnnotations: function( values ){
				return; //annotations.filter()
			},

			getContent: function( chapter ) {
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
				}).then(function(){
					annotationHandler.getAnnotations(chapter);
				});
			}
		}
	})();
	
	//Get initial content and annotations
	annotationHandler.getContent(8);
	//annotationHandler.getAnnotations(8);
		
	// Helper function to make sure chapter has leading zeroes.
	function sanitizeChapter(chapter) {
		var contentChapter = chapter ? chapter.toString() : '';
		
		if(contentChapter.length = 1) {
			contentChapter = '0'+ contentChapter;
		}

		return contentChapter;
	}
});