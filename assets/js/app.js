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

							node = {
								'category': annotationNode.getAttribute('category'),
								'text'    : annotationNode.textContent,
								//'charseq'   : annotationNode.getElementsByTagName('charseq')
							}
							annotations.add(node)
						  	
						  	annotationNode = annotationsIterator.iterateNext();
						}
					  }
					  catch (e) {
						console.log( 'Error: Document tree modified during iteration ' + e );
					  }
				})

				return annotations;
			},

			displayAnnotations: function(annotations) {
				var contentContainer = document.querySelector('.contents').innerHTML;
				var charSeq, span, category, start;
				var terms = [];
				console.log(annotations.entries());
				
				for(annotation of annotations) {
					console.log(annotation);
				}

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
			}
		}
	})();

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
	
	//Get initial content and annotations
	var annotations = annotationHandler.getAnnotations(8);

	getContent(8);

	annotationHandler.displayAnnotations(annotations);
		
	// Helper function to make sure chapter has leading zeroes.
	function sanitizeChapter(chapter) {
		var contentChapter = chapter ? chapter.toString() : '';
		
		if(contentChapter.length = 1) {
			contentChapter = '0'+ contentChapter;
		}

		return contentChapter;
	}

	// Changes XML to JSON
	function xmlToJson(xml) {
		
		// Create the return object
		var obj = {};

		if (xml.nodeType == 1) { // element
			// do attributes
			if (xml.attributes.length > 0) {
			obj["@attributes"] = {};
				for (var j = 0; j < xml.attributes.length; j++) {
					var attribute = xml.attributes.item(j);
					obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
				}
			}
		} else if (xml.nodeType == 3) { // text
			obj = xml.nodeValue;
		}

		// do children
		if (xml.hasChildNodes()) {
			for(var i = 0; i < xml.childNodes.length; i++) {
				var item = xml.childNodes.item(i);
				var nodeName = item.nodeName;
				if (typeof(obj[nodeName]) == "undefined") {
					obj[nodeName] = xmlToJson(item);
				} else {
					if (typeof(obj[nodeName].push) == "undefined") {
						var old = obj[nodeName];
						obj[nodeName] = [];
						obj[nodeName].push(old);
					}
					obj[nodeName].push(xmlToJson(item));
				}
			}
		}
		return obj;
	};
});