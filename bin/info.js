const chalk = require("chalk");
const fse = require('fs-extra');
const fs = require("fs");
const path = require('path');
const toml = require('@iarna/toml');
const execSync = require('child_process').execSync;

exports.infos = function() {
    const root = process.cwd();
    const appPath = path.join(root, "./.bunbuild");

    console.log(chalk.bgCyanBright.black.bold("[Bun Build]")+chalk.bgBlack.blue.italic(" $ Info"));
    if (appPath == root) {
        return;
    }
    if (fse.existsSync(appPath)) {
        const rawBuildFile = toml.parse(fs.readFileSync(appPath));
        console.log(chalk.bgCyanBright.black.bold("[Bun Build]")+chalk.bgBlack.white(" Bunbuild file settings\n"));
        for (const [key, value] of Object.entries(rawBuildFile["settings"])) {
            console.log(chalk.bgBlack.white(`- ${key}: ${value}`));
        }
        console.log(chalk.bgCyanBright.black.bold("[Bun Build]")+chalk.bgBlack.white(" Bunbuild file entry points\n"));
        rawBuildFile["files"].forEach((key) => console.log(chalk.bgBlack.white(`- ${key}`)));
    } else {
        console.log(chalk.bgCyanBright.black.bold("[Bun Build]")+chalk.bgBlack.redBright(" Error | Bunbuild file does not exist!"));
        process.exit(1);
    }
}