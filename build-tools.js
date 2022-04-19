#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
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

// Init Project
if (process.argv.length < 3 || process.argv[2] === '') {
  console.error('Please input APP_NAME');
} else {
  const projectName = process.argv[2];
  const workingDest = path.resolve(process.cwd(), projectName);
  fs.mkdirSync(workingDest);

  // Copy Files to destination
  const __dirname = fileURLToPath(path.dirname(import.meta.url));
  copyDirToDest(path.resolve(__dirname, 'bp-client'), workingDest);
  const packageJson = JSON.stringify(makePackage(projectName), null, 4);
  fs.writeFileSync(`${workingDest}/package.json`, packageJson);
}
