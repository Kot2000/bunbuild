const chalk = require("chalk");
const fse = require('fs-extra');
const fs = require("fs");
const path = require('path');
const toml = require('@iarna/toml');
const execSync = require('child_process').execSync;

exports.updater = async function() {
    const root = process.cwd();
    const appPath = path.join(root, "./.bunbuild");

    console.log(chalk.bgCyanBright.black.bold("[Bun Build]")+chalk.bgBlack.blue.italic(" $ Update --BUN"));
    try {
        execSync(
                `bun install -g @kot2000/bunbuild@latest`,
                 {stdio: 'inherit'}
        );
    } catch (e) {
        console.log(chalk.bgCyanBright.black.bold("[Bun Build]")+chalk.bgBlack.redBright(" Updater Critical Error | Something goes brrrr..."));
        console.log(chalk.bgCyanBright.black.bold("[Bun Build]")+chalk.bgBlack.redBright(" [!] Updater Critical Error | " + e));
    }
}