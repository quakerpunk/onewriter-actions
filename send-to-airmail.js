ui.hudProgress();

http.request({
    url: 'https://api.github.com/markdown',
    type: 'POST',
    contentType: 'application/json',
    data: {
        text: editor.getText(),
        mode: 'gfm'
    }
}, function(html) {
    ui.hudDismiss();
    compose(html);
});

function compose(html) {
    var url = 'airmail://compose?subject=' + encodeURIComponent(editor.getFileName() )+ '&htmlBody=' + encodeURIComponent(html);
    app.openURL(url);
}