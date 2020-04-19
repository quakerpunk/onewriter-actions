const require = (moduleName) => {
  http.request(
    {
      url: `https://unpkg.com/${moduleName}`,
    },
    (response, err) => {
      if (err) {
        ui.alert(err.message);
      }
      if (response.responseText.startsWith("Cannot find package")) {
        ui.alert(`Could not find ${moduleName} at unpkg.com`);
      }
    }
  );
};

let test1 = require("ufhgieei");
