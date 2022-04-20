#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Command } from 'commander';
import { dependencies, scripts, devDependencies } from './packageList.js';

function makePackage(projectName, moduleType = 'module') {
  const packageInfo = {
    name: projectName,
    version: '0.1.0',
    type: moduleType,
    scripts: {},
    dependencies: {},
    devDependencies: {},
  };

  dependencies.forEach((libItem) => {
    packageInfo.dependencies[libItem.name] = libItem.version;
  });

  devDependencies.forEach((libItem) => {
    packageInfo.devDependencies[libItem.name] = libItem.version;
  });

  scripts.forEach((libItem) => {
    packageInfo.scripts[libItem.alias] = libItem.script;
  });

  return packageInfo;
}

function copyFile(src, dest) {
  const content = fs.readFileSync(src);
  fs.writeFileSync(dest, content);
}

function copyDirToDest(srcDir, destDir) {
  try {
    const src = fs.readdirSync(srcDir);

    src.forEach((str) => {
      const source = `${srcDir}/${str}`;
      const destination = `${destDir}/${str}`;

      if (fs.lstatSync(source).isDirectory()) {
        fs.mkdirSync(destination);
        copyDirToDest(source, destination);
      } else {
        copyFile(source, destination);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

function copyProject(projectDir, workingDest, projectName) {
  const __dirname = fileURLToPath(path.dirname(import.meta.url));
  copyDirToDest(path.resolve(__dirname, projectDir), workingDest);
  const packageJson = JSON.stringify(makePackage(projectName), null, 4);
  fs.writeFileSync(`${workingDest}/package.json`, packageJson);
}

const program = new Command();

program.option(
  '-t, --type <type>',
  'Type of project. Default basic typescript project.',
  'ts'
);

program
  .argument('<projectName>', 'project name')
  .action((projectName, option) => {
    // Init Project
    const workingDest = path.resolve(process.cwd(), projectName);
    fs.mkdirSync(workingDest); // TODO: Except file already exist

    if (option.type === 'ts') {
      copyProject('bp-typescript', workingDest, projectName);
    } else if (option.type === 'js') {
      copyProject('bp-javascript', workingDest, projectName);
    } else if (option.type === 'react-ts' || option.type === 'rts') {
      copyProject('bp-client', workingDest, projectName);
    } else if (option.type === 'react-js' || option.type == 'rjs') {
      // copyProject('bp-typescript', workingDest, projectName);
    } else if (option.type === 'express-ts' || option.type === 'ets') {
      copyProject('bp-server', workingDest, projectName);
    } else if (option.type === 'express-js' || option.type === 'ejs') {
      // copyProject('bp-typescript', workingDest, projectName);
    }
  });

console.log(import.meta.url);
