const require = (moduleName) => {
  http.request(
    {
      url: `https://unpkg.com/${moduleName}`,
    },
    (response, err) => {
      if (err) {
        let errorText = JSON.stringify(err);
        ui.alert(errorText, "Error from require module.");
      }
      if (response && response.responseText.startsWith("Cannot find package")) {
        ui.alert(`Could not find ${moduleName} at unpkg.com`);
      }
    }
  );
};

let test1 = require("ufhgieei");
