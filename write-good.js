const debug = false;
const require = (moduleName) => {
  http.request(
    {
      url: `https://unpkg.com/${moduleName}`,
    },
    (data, err) => {
      if (err && err[0] == 302) {
        require(data.headers.location);
      }
      if (err && err[0] == 404) {
        ui.alert(`Could not find ${moduleName} at unpkg.com`);
      }
      if (data && data.responseText.startsWith("Cannot find package")) {
        ui.alert(`Could not find ${moduleName} at unpkg.com`);
      }
    }
  );

  // Suppose the module tries to set module.exports.
  // Well, we can't have that.
  let module = {};
  if (module.exports) return module.exports;

  if (debug) {
    if (data) {
      ui.alert(JSON.stringify(data));
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
