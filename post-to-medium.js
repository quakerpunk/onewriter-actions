var data = {
    "title" : "",
    "contentFormat" : "markdown",
    "content": editor.getText(),
    "publishStatus": "public",
    "license": "all-rights-reserved",
    "canonicalUrl": "",
    "tags": []
};

var token = '',
    usrId = '',
    headers;

headers = {
  "Accept"         : "application/json",
  "Accept-Charset" : "utf-8",
  "Authorization"  : "Bearer " + token
};

if (usrId === '') {
    http.request({
           url : 'https://api.medium.com/v1/me',
          type : 'GET',
       headers : headers,
          data : {}
    }, function(res, err) {
        usrId = res.data.id;
        setTitle();
    });
} else {
    setTitle();
}

function arrContains(value, arr) {
  var i = 0,
      l = arr.length - 1,
      s = value.toLowerCase();
      
  while (arr[i].toLowerCase() !== s) {
    if (i === l) { return false; break; }
    i++;
  } 
  return true;
}

function setTitle() {
    var originalTitle = data.content.split('\n')[0],
        headerIndex = originalTitle.indexOf('#');
   
    if (headerIndex === 0) {
      var suggestedTitle = originalTitle.replace(/#+\s?(.*)/gim, '$1'),
          suggestedIndex = originalTitle.indexOf(suggestedTitle[0]);
      
      if (originalTitle.indexOf(' ') > suggestedIndex) {
        // Medium doesn't consider #Title as H1, only # Title.
        editor.replaceTextInRange(suggestedIndex,suggestedIndex, ' ');
        data.content = editor.getText();
      }
    }
    ui.input('Article\'s SEO Title', suggestedTitle, setFormat);
}

function setFormat(v) {
  // v = title
  if (typeof v === 'undefined' || v === '') {
      ui.hudError('A title is required');
      return;
  } else {
    data.title = v;
  }

  var choice = ['Markdown', 'HTML'];

  if (typeof data.contentFormat === 'boolean' || typeof data.contentFormat !== "string" || !arrContains(data.contentFormat, choice)) {
    ui.list('Select the format', choice, setTags);
  } else {
    setTags(data.contentFormat);
  }
}

function setTags(v) {
  // v = contentFormat
  if (typeof v === 'undefined') {
    ui.alert(v);
    ui.hudError('A format is required');
    return;
  } else {
    data.contentFormat = (typeof v === 'object' ? v[0].toLowerCase() : v.toLowerCase());
  }

  if (!data.tags || typeof data.tags === 'object') {
    setCanonical(data.tags);
  } else if (typeof data.tags === 'string') {
    data.tags = data.tags.split(',');
    setCanonical(data.tags);
  } else if (typeof data.tags === 'boolean') {
   // data.tags : true
   ui.input('Tags (comma-separated)', setCanonical);
  }
}

function setCanonical(v) {
  // v = tags
  if (typeof v === 'string') {
    data.tags = v.split(',');
  } else if (typeof v !== 'undefined') {
    data.tags = v;
  }

  if (!data.canonicalUrl || data.canonicalUrl === '') {
    setStatus(false);
  } else {
    ui.input('Canonical URL', null, null, 'url', setStatus);
  }
}

function setStatus(v) {
  // v = canonical
  if (v) {
    data.canonicalUrl = v;
  }

  var choice = ['Public', 'Draft', 'Unlisted'];

  if (data.publishStatus && typeof data.publishStatus !== 'string' || !arrContains(data.publishStatus, choice)) {
    ui.list('Publishing status', choice, setLicense);
  } else {
    setLicense(data.publishStatus);
  }
}

function setLicense(v) {
  // v = publishStatus
  if (typeof v === 'undefined') {
    data.publishStatus = 'public'
  } else {
    data.publishStatus = (typeof v === 'object' ? v[0].toLowerCase() : v.toLowerCase());
  }

  var choice = ["all-rights-reserved", "cc-40-by", "cc-40-by-sa", "cc-40-by-nd", "cc-40-by-nc", "cc-40-by-nc-nd", "cc-40-by-nc-sa", "cc-40-zero", "public-domain"];
  
  if (data.license && typeof data.license !== 'string' || !arrContains(data.license, choice)) {
    ui.list('Publishing status', choice, publish);
  } else {
    publish(data.license);
  }
}

function publish(v) {
  // v = license
  if (typeof v === 'undefined') {
    data.license = 'all-rights-reserved'
  } else {
    data.license = (typeof v === 'object' ? v[0].toLowerCase() : v.toLowerCase());
  }

  http.request({
           url : 'https://api.medium.com/v1/users/' + usrId + '/posts',
          type : 'POST',
       headers : headers,
          data : data
    }, function(res, err) {
        if (err) {
          ui.hudError(err);
        } else {
           ui.hudSuccess('Published!');
           webBrowser.open(res.data.url);
        }
    });
}