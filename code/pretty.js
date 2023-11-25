(function () {
	const queryString = window.location.search;

	const urlParams = new URLSearchParams(queryString);

	var findDynamicPhrases = new RegExp("%(.*?)%", "g");
	var findPercent = new RegExp("%", "g");
	var mainContent = $(".content-wrap");
	var heroContent = $(".hero");
	function escapeOutput(toOutput) {
	  if(toOutput) {
		return toOutput
		.replace(/\&/g, "&")
		.replace(/\</g, "<")
		.replace(/\>/g, ">")
		.replace(/\"/g, '"')
		.replace(/\'/g, "&#x27")
		.replace(/\\//g, "&#x2F");
	  }
	}
	function convertPhrase(string) {
	  string = string.replace(findPercent, "").split("||");
	  var dynamic = string[0];
	  var fallback = string[1];
	  var result = fallback;
	
	  // Convert the iterator to an array before using forEach
	  Array.from(urlParams.entries()).forEach((entry) => {
		const key = entry[0];
		const value = entry[1];
		if (value === "") {
		  return false;
		}
		var findKey = new RegExp("{{" + key + "}}", "g");
	
		if (dynamic.match(findKey)) {
		  result = dynamic.replace(findKey, decodeURIComponent(value));
		  return false;
		}
	  });
	  return escapeOutput(result);
	}

	mainContent.html(function (i, old) {
	  return old.replace(findDynamicPhrases, convertPhrase);
	});
	
	heroContent.html(function (i, old) {
	  return old.replace(findDynamicPhrases, convertPhrase);
	});
	
	var title = $("title");
	title.html(function (i, old) {
	  return old.replace(findDynamicPhrases, convertPhrase);
	});
  })();
