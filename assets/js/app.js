document.addEventListener('DOMContentLoaded', function(event) {
	var annotationHandler = (function() {
		var annotations = [];

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
					var xmlJson = xmlToJson(xmlDoc);
					var annotationsFromXml = xmlJson.document.span;

					annotations.push.apply(annotations,annotationsFromXml);
				});

				return annotations;
			},

			displayAnnotations: function(annotations) {
				var contentContainer = document.querySelector('.contents').innerHTML;
				var charSeq, span, category, start;
				var terms = [];
				console.log(annotations);
				for (annotation in annotations) {
					console.log(annotation);
				}
			},
			
			insertAnnotations: function( value ){
				return annotations.add(value);
			},

			updateAnnotations: function( values ){
				console.log(values);
			},

			removeAnnotations: function( value ){
				return annotations.delete(value);
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