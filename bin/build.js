const chalk = require("chalk");
const fse = require('fs-extra');
const fs = require("fs");
const path = require('path');
const toml = require('@iarna/toml');
const execSync = require('child_process').execSync;

exports.builder = async function(options) {
    const root = process.cwd();
    const appPath = path.join(root, "./.bunbuild");

    console.log(chalk.bgCyanBright.black.bold("[Bun Build]")+chalk.bgBlack.blue.italic(" $ Build"));
    if (appPath == root) {
        return;
    }
    if (fse.existsSync(appPath)) {
        const rawBuildFile = toml.parse(fs.readFileSync(appPath));
        try {
            let files = [];
            rawBuildFile["files"].map((item) => {files = files + " " + item});

            execSync(
                `bun build --entrypoints ${files} --outdir ${rawBuildFile["settings"]["outdir"]} --target ${rawBuildFile["settings"]["target"]} --format ${rawBuildFile["settings"]["format"]} ${(rawBuildFile["settings"]["splitting"]) == (true || "true") ? "--splitting" : ""} --sourcemap=${rawBuildFile["settings"]["sourcemap"]} ${(rawBuildFile["settings"]["minify"]) == (true || "true") ? "--minify" : ""} --entry-naming ${rawBuildFile["settings"]["naming"]} ${(options.watch || false) == true ? "--watch" : ""}`,
                 {stdio: 'inherit'}
            );
        } catch (e) {
            console.log(chalk.bgCyanBright.black.bold("[Bun Build]")+chalk.bgBlack.redBright(" Builder Critical Error | Changing Builder Run Mode! (Without Watch mode)"));
            await Bun.build({
                entrypoints: rawBuildFile["files"],
                outdir: rawBuildFile["settings"]["outdir"],
                target: rawBuildFile["settings"]["target"],
                format: rawBuildFile["settings"]["format"],
                splitting: (rawBuildFile["settings"]["splitting"]) == (true || "true") ? true : false,
                sourcemap: rawBuildFile["settings"]["sourcemap"],
                minify: (rawBuildFile["settings"]["minify"]) == (true || "true") ? true : false,
                naming: rawBuildFile["settings"]["naming"],
                root: rawBuildFile["settings"]["root"],
            });
        }
    } else {
        console.log(chalk.bgCyanBright.black.bold("[Bun Build]")+chalk.bgBlack.redBright(" Error | Bunbuild file does not exist!"));
        process.exit(1);
    }
}