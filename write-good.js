const require = (moduleName) => {
  http.request(
    {
      url: `https://unpkg.com/${moduleName}`,
    },
    (response, err) => {
      if (err) {
        ui.alert(`Could not download ${moduleName} from unpkg.com`);
      }
      if (response && response.responseText.startsWith("Cannot find package")) {
        ui.alert(`Could not find ${moduleName} at unpkg.com`);
      }
    }
  );
};

let test1 = require("ufhgieei");
