const chalk = require("chalk");
const fse = require('fs-extra');
const fs = require("fs");
const path = require('path');
const toml = require('@iarna/toml');
const execSync = require('child_process').execSync;

exports.set = function(key, value) {
    const root = process.cwd();
    const appPath = path.join(root, "./.bunbuild");

    console.log(chalk.bgCyanBright.black.bold("[Bun Build]")+chalk.bgBlack.blue.italic(" $ Set"));
    if (appPath == root) {
        return;
    }
    if (fse.existsSync(appPath)) {
        const rawBuildFile = toml.parse(fs.readFileSync(appPath));
        rawBuildFile["settings"][key] = value;
        fs.writeFileSync(appPath, "# !bunbuild | Do not edit this file manually; automatically generated.\n"+toml.stringify(rawBuildFile));
        console.log(chalk.bgCyanBright.black.bold("[Bun Build]")+chalk.bgBlack.greenBright(` Successfully Set "${key}" to "${value}" in Bunbuild file`));
    } else {
        console.log(chalk.bgCyanBright.black.bold("[Bun Build]")+chalk.bgBlack.redBright(" Error | Bunbuild file does not exist!"));
        process.exit(1);
    }
}