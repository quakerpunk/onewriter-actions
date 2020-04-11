/* 
Script: ESV 2 Text
Author: @coomlata1
Created: 11/09/2017
Last Modified: 11/13/2017

Description: ESV api version 2 has been depreciated effect 11/07/2017. It is no longer supported for daily use, except for testing purposes. Version 3 of the api requires an authorization token from esv.org for access. Follow instructions on the website to aquire the token.

This action script queries the ESV api v3 for the selected Scripture reference and returns the passage(s) formatted in Markdown.
*/

/*
Get nbr of digits in chapter...Could be 1, 2, or 3, as is the case in book of Psalms
*/
function getNbrChapterDigits(verse, pos) {
  for (var n = 2; n < 5; n++) {
    if(verse[pos-n]==" " || verse[pos-n]=="-") {
      n = n - 1
      return n
    }
  }
}

// Create array of chapter numbers 
function getChapterNbrs(verse) {
  var chapNbrs = []
  // Loop each element of verse for chapters
  for (var j=0; j < verse.length; j++) {
    // If colon found
    if(verse[j] == ":") {
      // Get nbr of digits in chapter
      n = getNbrChapterDigits(verse, j)
      // Slice out chapter nbr left of colon
      var start = verse.slice(j-n, j)
      // Add 1 for next chapter
      start = parseInt(start) + 1
      // Add chapter nbr to array
      chapNbrs.push(start)
    }
  }
  return chapNbrs
}

// Add chapter nbr & linefeed to 1st first of
// each chapter
function addLfToFirstVerse(chapters, text, skip_first_chapter) {
  // Don't skip first chapter ie Acts 4:1-6:7
  // Skip would be true if passage was Acts 4:3-6:7
  if(skip_first_chapter == false) {
    var a = chapters[0]-1} else {
    var a = chapters[0]
  }

  // Loop each chapter in array
  for (var k = a; k < chapters[1]; k++) {
    // Find every 1st verse in each chapter
    var find = "<sup>**" + "1" + "**</sup>";
    // Add line feed and chapter number to 
    // start of every 1st verse
    var replace = "\n<sup>**" + k + ":1" + "**</sup>";
    // Replace each find with replace
    text = text.replace(find, replace)
  }
  return text
}

// Determines number of occurences of
// 'char_to_count'
function findOccurences(str, char_to_count) {
  return str.split(char_to_count).length - 1;
}

// Select desired verse(s) to look up
var verses = editor.getSelectedText();
// If nothing selected then prompt user for input
if("" == verses) {
  ui.alert('Enter desired verses at the next prompt. Seperate all chapters & verses with commas (John 1:2-3,4:1-5,7-8,Luke 4:5-7,5:10-6:20).', 'Bible Verse Info','Ok', enterVerses)
} else {
  getScripture(verses);
}

// Present input box for input
function enterVerses() {
  ui.input('Bible Verses', null, 'Enter Your Desired Verses:', function(value) {
    if (value) {
      getScripture(value);
    }
  });
}

// Queries ESV api for text of desired verses
function getScripture(verses) {
  // Token required in api v3...acquire @ esv.org
  var token = 'toducken'
  // Compose url
  url = "https://api.esv.org/v3/passage/text/?q=";
  // Trim any white spaces off each end of verse
  verses = verses.trim();
  // Replace all blank spaces in verses with a '+'
  url += verses.replace(/ /gi, "+");
  
  // Add in desired output options
  url += "&include-headings=false&include-footnotes=false&include-passage-horizontal-lines=false&include-passage-references=true&include-heading-horizontal-lines=false&line-length=0";
  //ui.alert(url);
  http.request({
    url: url,
    type: 'GET',
    // Required in api v3
    headers: {Authorization: 'Token ' + token},
},formatPassages);

  // Cleanup & format returned text in markdown
  function formatPassages(data, err) {
    // Error check results of api query
    if(err) { ui.alert(err); } else {
      // Convert query data to clean json string
      var json_str = JSON.stringify(data,null,4)
      // Convert back to object
      var json_obj = JSON.parse(json_str)
      // Debug
      //ui.alert(json_str)
      //ui.alert(json_obj.passages)
      text = JSON.stringify(json_obj.passages)
      // Add superscript & bold to verse numbers
      text = text.replace(/\[([0123456789:]+)\]/g, "<sup>**$1**</sup>");
      verses_canon = json_obj.canonical
      verses_canon = verses_canon.split(";")
      verses = verses.split(",")
      
      for (var i = 0; i < verses.length; i++) {
        // Remove white spaces at each end
        verses[i] = verses[i].trim()
        // Check if verse has colons
        if (verses[i].indexOf(":") != -1) {
          // If so, how many colons?
          var n_colons = findOccurences(verses[i], ':')
          /* Api v3 creates a canonical version of
          the verse(s) which does not add a colon
          to the first verse of a chapter, ie
          Acts 4:1 becomes Acts 4 in canonical
          syntax. Find out how many colons are in 
          the equivalent canonical version of the
          verse.*/
          var n_canon_colons = findOccurences(verses_canon[i], ':')
          // Set default for variable
          // Don't add first chapter number to
          // first verse
          skip_first_chapter = true
          // If user entered verse has 2 colons
          // we assume that there is 2 chapters in
          // passage
          if(n_colons == 2) {
            // and canonical version does as well,
            // but syntax provides only 1 colon if
            // the first chapter lists verse 1 as
            // the first verse. 
            if(n_canon_colons != 2) {
              // Add number of first chapter to
              // first verse
              skip_first_chapter = false
            }
            // Get the chapter numbers
            var chapters = getChapterNbrs(verses[i])
            //ui.alert(chapters)
            // Add chapter numbers and a line feed
            // to the first verse in each chapter
            text = addLfToFirstVerse(chapters, text, skip_first_chapter)
          }
        }
      }
      // Final cleanup of text
      text = text.replace(/","/gi, '\n\n' + '**');
      text = text.replace(/\\n\\n/g, '**' + '\n');
      text = text.replace(/\\n/g, '');
      text = text.replace(/\["/, '**');
      text = text.replace(/\"]/, '');
      text = text.replace(/\.\**/g, '.');
      //text = text.replace(/\.\"\**/g, '"');

      // Overwrite selected text with new text
      editor.replaceSelection(text);
    }
  }
}