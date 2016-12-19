import _ = require("lodash");

$(function(){
	let $examples = $("[data-example]");

	$examples.each(function(t: number, example: HTMLElement){
		let $exampleId = <string>$(example).data("example");
		let $html = $($exampleId).html();

		// trim whitespace from the end of the html
		$html = $html.replace(/\s*$/, "");

		// strip out shared initial tabs to left justify html
		let lines: string[] = $html.split("\n");
		lines = _.without(lines, "");

		let match = true;
		while (match) {
			let stripped: string[] = new Array<string>(lines.length);

			for (let l = 0; l < lines.length; l++) {
				if (lines[l].indexOf("\t") === 0) {
					stripped[l] = lines[l].substr(1);
				} else {
					match = false;
					stripped = lines;
					break;
				}
			}

			lines = stripped;
		}

		$(example).text(_.join(lines, "\n"));
	});
});