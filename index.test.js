const index = require("./index");

function getTomlString() {
  return `
    [package]
    name = "images"
    version = "0.1.0"
    edition = "2021"
    
    [dependencies]
    rusoto_s3 = "0.48.0"
    rusoto_core = "0.48.0"
    rusoto_signature = "0.48.0"
    rusoto_credential = "0.48.0"
    async-trait = "0.1.53"  
  `;
}

test("validate version simple", () => {
  let expectedValue = "0.1.0";

  let tomlContent = getTomlString();
  let tomlObj = index.parseTomlContent(tomlContent);

  let output = index.getTomlValue(tomlObj, "package.version");

  expect(output === expectedValue).toBeTruthy();
});
