const grabWriteGood = () => {
  http.request(
    {
      url: "https://unpkg.com/write-good@1.0.2/write-good.js",
    },
    (data, err) => {
      if (err && err[0] == 404) {
        ui.alert(`Could not find ${moduleName} at unpkg.com`);
      }
      if (data) {
        eval(data.responseText);
      }
    }
  );
};

// Make those NodeJS modules behave.
const process = {
  env: {
    NODE_ENV: undefined,
  },
};

grabWriteGood();
let suggestions = writeGood("So the cat was stolen.");
ui.alert(JSON.stringify(suggestions));
