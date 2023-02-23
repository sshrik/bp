#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Command } from 'commander';

const __dirname = fileURLToPath(path.dirname(import.meta.url));

function readJSON(jsonFileName) {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, jsonFileName)));
}

const tsReactPackage = readJSON('bp-client/package.json');
const tsReactTailwindPackage = readJSON('bp-client-tailwind/package.json');
const tsExpressPackage = readJSON('bp-server/package.json');
const jsBasePackage = readJSON('bp-javascript/package.json');
const tsBasePackage = readJSON('bp-typescript/package.json');

const PROJECT_TYPE = {
  TS_BASE: 'TS_BASE',
  JS_BASE: 'JS_BASE',
  TS_REACT: 'TS_REACT',
  TS_REACT_TAILWIND: 'TS_REACT_TAILWIND',
  JS_REACT: 'JS_REACT',
  TS_EXPRESS: 'TS_EXPRESS',
  JS_EXPRESS: 'JS_EXPRESS',
};

function parseOption(option) {
  if (option === 'ts') {
    return PROJECT_TYPE.TS_BASE;
  } else if (option === 'js') {
    return PROJECT_TYPE.JS_BASE;
  } else if (option === 'react-ts' || option === 'rts') {
    return PROJECT_TYPE.TS_REACT;
  } else if (option === 'react-ts-tailwind' || option === 'rtst') {
    return PROJECT_TYPE.TS_REACT_TAILWIND;
  } else if (option === 'react-js' || option == 'rjs') {
    return PROJECT_TYPE.JS_REACT;
  } else if (option === 'express-ts' || option === 'ets') {
    return PROJECT_TYPE.TS_EXPRESS;
  } else if (option === 'express-js' || option === 'ejs') {
    return PROJECT_TYPE.JS_EXPRESS;
  }
}

function makePackage(option, packageName) {
  switch (parseOption(option)) {
    case PROJECT_TYPE.TS_BASE:
      return { ...tsBasePackage, name: packageName };
    case PROJECT_TYPE.JS_BASE:
      return { ...jsBasePackage, name: packageName };
    case PROJECT_TYPE.TS_REACT:
      return { ...tsReactPackage, name: packageName };
    case PROJECT_TYPE.TS_REACT_TAILWIND:
      return { ...tsReactTailwindPackage, name: packageName };
    case PROJECT_TYPE.TS_EXPRESS:
      return { ...tsExpressPackage, name: packageName };
    default:
      return { name: packageName };
  }
}

function copyFile(src, dest) {
  const content = fs.readFileSync(src);
  fs.writeFileSync(dest, content);
}

function copyDirToDest(srcDir, destDir, noCopyDirList = ['node_modules']) {
  try {
    const src = fs.readdirSync(srcDir);

    src.forEach((str) => {
      if (noCopyDirList.includes(str)) return;

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

function copyProject(projectDir, workingDest, projectName, option) {
  copyDirToDest(path.resolve(__dirname, projectDir), workingDest);

  const packageFile = makePackage(option, projectName);

  fs.writeFileSync(
    path.resolve(workingDest, 'package.json'),
    JSON.stringify(packageFile, null, 2)
  );
}

const program = new Command();

program.option(
  '-t, --type <type>',
  'Type of project. Default basic typescript project.\n\
    You can choose from ts, js, react-ts(rts), react-ts-tailwind(rtst), react-js(rjs), express-ts(ets), express-js(ejs)',
  'ts'
);

program
  .argument('<projectName>', 'project name')
  .action((projectName, option) => {
    // Init Project
    const workingDest = path.resolve(process.cwd(), projectName);
    fs.mkdirSync(workingDest); // TODO: Except file already exist

    const projectType = option.type;

    switch (parseOption(projectType)) {
      case PROJECT_TYPE.TS_BASE:
        copyProject('bp-typescript', workingDest, projectName, projectType);
        break;
      case PROJECT_TYPE.JS_BASE:
        copyProject('bp-javascript', workingDest, projectName, projectType);
        break;
      case PROJECT_TYPE.TS_REACT:
        copyProject('bp-client', workingDest, projectName, projectType);
        break;
      case PROJECT_TYPE.TS_REACT_TAILWIND:
        copyProject(
          'bp-client-tailwind',
          workingDest,
          projectName,
          projectType
        );
        break;
      case PROJECT_TYPE.TS_EXPRESS:
        copyProject('bp-server', workingDest, projectName, projectType);
        break;
      default:
        copyProject('bp-typescript', workingDest, projectName, projectType);
        break;
    }
  });

program.parse();
