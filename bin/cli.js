#!/usr/bin/env bun

const commander = require('commander');
const scriptPackageJson = require('../package.json');

const {initBuildfile} = require("./init");
const {templateBuildfile} = require("./template");
const {addEntryPoint} = require("./add");
const {removeEntryPoint} = require("./remove");
const {infos} = require("./info");
const {builder} = require("./build");
const {set} = require("./settings");
const {deleteBuildfile} = require("./delete");
const {updater} = require("./update");

const scriptName = scriptPackageJson.name;

const program = new commander.Command(scriptName);

program
    .name('bunbuild')
    .version(scriptPackageJson.version)
    .description(scriptPackageJson.description)
program
    .command('update', {isDefault: true})
    .alias("upd")
    .description('Update CLI to newest version!')
    .version(scriptPackageJson.version)
    .action(() => {
        updater();
    });
program
    .command('init', {isDefault: true})
    .alias("i")
    .description('Create new Bunbuild file')
    .version(scriptPackageJson.version)
    .action(() => {
        initBuildfile();
    });
program
    .command('template', {isDefault: true})
    .alias("t")
    .description('Create new Bunbuild file with templates')
    .argument('<platform>', 'Template Platform; Browser, Bun, Node')
    .argument('<format>', 'Template Format; ESM')
    .option('--library', 'Is Library')
    .version(scriptPackageJson.version)
    .action((platform, format, options) => {
        if (format.toLowerCase() == "esm") {
            if (platform.toLowerCase() == "browser") {
                templateBuildfile(`esm_browser${options.library ? "_library" : ""}`);
            } else if (platform.toLowerCase() == "bun") {
                templateBuildfile(`esm_bun${options.library ? "_library" : ""}`);
            } else if (platform.toLowerCase() == "node") {
                templateBuildfile(`esm_node${options.library ? "_library" : ""}`);
            }
        }
    });
program
    .command("delete")
    .alias("del")
    .description("Delete Bunbuild file")
    .version(scriptPackageJson.version)
    .action((name) => {
        deleteBuildfile();
    });

program
    .command("add")
    .alias("a")
    .description("Add new entrypoint to Bunbuild file")
    .argument('<name>', 'Name of file.')
    .version(scriptPackageJson.version)
    .action((name) => {
        addEntryPoint(name);
    });

program
    .command("remove")
    .alias("r")
    .description("Remove entrypoint from Bunbuild file")
    .argument('<name>', 'Name of file.')
    .version(scriptPackageJson.version)
    .action((name) => {
        removeEntryPoint(name);
    });
program
    .command("info")
    .alias("n")
    .description("Logs all settings and entry points of Bunbuild file")
    .version(scriptPackageJson.version)
    .action(() => {
        infos();
    });

program
    .command("build")
    .alias("b")
    .description("Build project")
    .version(scriptPackageJson.version)
    .option('--watch', 'build in watch mode')
    .action((options) => {
        builder(options);
    });
program
    .command("set")
    .alias("s")
    .description("Change settings in Bunbuild file")
    .argument('<key>', 'Key of setting.')
    .argument('<value>', 'Value of setting.')
    .version(scriptPackageJson.version)
    .action((key, value) => {
        set(key, value);
    });

program.parse(process.argv);