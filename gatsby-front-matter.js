// get filename
ui.input('Title', 'Enter Title', '', '', value => {if (value) buildFrontMatter(value)});

// set datetime
function buildFrontMatter(inputTitle) {
	let today = new Date();
	let date = today.toJSON().slice(0,10);
	let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	let datetime = "date: " + date + " " + time;

	// set title for Gatsby front matter
	let title = "title: \"" + inputTitle + "\""

	// set front matter
	let frontMatter = "---\n" + title + "\n" + datetime + "\n---\n"

	editor.replaceTextInRange(0, 0, frontMatter);
}