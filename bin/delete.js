const chalk = require("chalk");
const fse = require('fs-extra');
const fs = require("fs");
const path = require('path');
const execSync = require('child_process').execSync;

exports.deleteBuildfile = function() {
    const root = process.cwd();
    const appPath = path.join(root, "./.bunbuild");

    if (appPath == root) {
        return;
    }
    if (!fse.existsSync(appPath)) {
        console.log(chalk.bgCyanBright.black.bold("[Bun Build]")+chalk.bgBlack.blue.italic(" $ Delete"));
        console.log(chalk.bgCyanBright.black.bold("[Bun Build]")+chalk.bgBlack.redBright(" Error | Bunbuild file does not exist!"));
        process.exit(1);
    } else {
        fs.rmSync(appPath);
        console.log(chalk.bgCyanBright.black.bold("[Bun Build]")+chalk.bgBlack.blue.italic(" $ Delete"));
        console.log(chalk.bgCyanBright.black.bold("[Bun Build]")+chalk.bgBlack.greenBright(" Successfully Deleted BunBuild File!"));
    }
}