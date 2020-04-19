const debug = false;
const require = (moduleName) => {
  http.request(
    {
      url: `https://unpkg.com/${moduleName}`,
    },
    (response, err) => {
      if (err && err[0] == 404) {
        ui.alert(`Could not find ${moduleName} at unpkg.com`);
      }
      if (response && response.responseText.startsWith("Cannot find package")) {
        ui.alert(`Could not find ${moduleName} at unpkg.com`);
      }
    }
  );

  // Suppose the module tries to set module.exports.
  // Well, we can't have that.
  let module = {};
  if (module.exports) return module.exports;

  if (debug) {
    if (response) {
      ui.alert(JSON.stringify(response));
    }
    ui.alert(JSON.stringify(this));
  }
};

// Make those NodeJS modules behave.
const process = {
  env: {
    NODE_ENV: undefined,
  },
};

let writeGood = require("write-good");
