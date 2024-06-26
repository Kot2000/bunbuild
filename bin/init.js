const chalk = require("chalk");
const fse = require('fs-extra');
const fs = require("fs");
const path = require('path');
const execSync = require('child_process').execSync;

const bbicon = [
    chalk.bgCyanBright.cyanBright("██████"),
    chalk.bgCyanBright.cyanBright("█")+chalk.bgCyanBright.white.bold(".BUN")+chalk.bgCyanBright.cyanBright("█"),
    chalk.bgCyanBright.white.bold("BUILD")+chalk.bgCyanBright.cyanBright("█")
]; 

exports.initBuildfile = function() {
    const root = process.cwd();
    const appPath = path.join(root, "./.bunbuild");

    if (appPath == root) {
        return;
    }
    if (fse.existsSync(appPath)) {
        console.log(chalk.bgCyanBright.black.bold("[Bun Build]")+chalk.bgBlack.blue.italic(" $ Init"));
        console.log(chalk.bgCyanBright.black.bold("[Bun Build]")+chalk.bgBlack.redBright(" Error | Bunbuild file already exists"));
        process.exit(1);
    } else {
        fs.writeFileSync(appPath, '# !bunbuild | Do not edit this file manually; automatically generated.\nfiles=[]\n[settings]\noutdir = "./out"\ntarget = "browser"\nformat = "esm"\nsplitting = false\nsourcemap = "none"\nminify = false\nnaming = "./[dir]/[name].[ext]"\nroot = "."');
        console.log(chalk.bgCyanBright.black.bold("[Bun Build]")+chalk.bgBlack.blue.italic(" $ Init"));
        console.log(chalk.bgCyanBright.black.bold("[Bun Build]")+chalk.bgBlack.greenBright(" Successfully Created BunBuild File!")+"      "+bbicon[0]);
        console.log(                                                                "                                                     "+bbicon[1]);
        console.log(                                                                "                                                     "+bbicon[2]);
    }
}