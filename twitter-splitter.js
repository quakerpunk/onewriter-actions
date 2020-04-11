// See online documentation for examples
// http://getdrafts.com/scripting

var selections = ["Add Index", "No Index", "No Space for Index"];

ui.list("Twitter Splitter", selections, false, selectedValue => {
	if (!selectedValue) {return;}
	
	let maxLength = 274;
	if (selectedValue == "No Space for Index") {
		maxLength = 280;
	}
	
	let content = editor.getText();
	let tweets = [];
	let chunk = content.substr(0, maxLength);
	let spaceIdx = chunk.lastIndexOf(" ");
	
	while (content.length > maxLength) {
		tweets.push(content.substr(0, spaceIdx));
		content = (content.substr(spaceIdx, content.length));
	}
	
	if (selectedValue == "Add Index") {
		let text = "";
		for (let i = 0; i < tweets.length; i++) {
			text += tweets[i] + " " + (i+1) + "/" + tweets.length + "\n===\n";
		}
		editor.setText(text);
	} else {
		editor.setText(tweets.join("\n===\n"));
	}
});