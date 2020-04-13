// based on @derekvan's Wrapper https://actions.getdrafts.com/a/1Q8

let range = editor.getSelectedRange();
let choices = [
    "( )",
    "[ ]",
    "' '",
    "\" \"",
    "{ }",
    "< >",
    "` `",
];
ui.list("Which characters do you want to wrap the selection with?", choices, false, selectedValues => {
    if (selectedValues && range[1] > 0) {
        editor.replaceSelection(selectedValues[0].split(' ')[0] + editor.getSelectedText() + selectedValues[0].split(' ')[1]);
    }
});