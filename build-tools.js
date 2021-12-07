#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
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
    console.log(srcDir, ' : dir error');
  }
}

// Init Project
const projectName = process.argv[2];
const workingDest = path.resolve(process.cwd(), projectName);
fs.mkdirSync(workingDest);

// Copy Files to destination
copyDirToDest('bp-dest', workingDest);
const packageJson = JSON.stringify(makePackage(projectName), null, 4);
fs.writeFileSync(`${workingDest}/package.json`, packageJson);
