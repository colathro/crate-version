const core = require("@actions/core");
const path = require("node:path");
const fs = require("node:fs");
const toml = require("@iarna/toml");

function run() {
  try {
    const fileName = core.getInput("file", { required: true });
    const filePath = path.join(process.env.GITHUB_WORKSPACE, fileName);

    let tomlContent = getTomlContent(filePath);
    let tomlObj = parseTomlContent(tomlContent);

    let version = getTomlValue(tomlObj, "package.version");

    if (version === null || version === "") {
      throw Error("version not found");
    }

    core.setOutput("version", version);
  } catch (error) {
    core.setFailed(error.message);
  }
}

function getTomlContent(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`The toml file does not exist: ${filePath}`);
  }

  return fs.readFileSync(filePath, "utf8");
}

function parseTomlContent(tomlContent) {
  return toml.parse(tomlContent);
}

function getTomlValue(tomlObj, key) {
  let keys = key.split(".");

  let targetTable = null;
  for (let index = 0; index < keys.length; index++) {
    if (targetTable === null) {
      targetTable = tomlObj[keys[index]];
    } else {
      targetTable = targetTable[keys[index]];
    }
  }

  return targetTable;
}

module.exports = {
  getTomlValue,
  parseTomlContent,
};

run();
