import { readFileSync, writeFileSync } from 'fs';
import chalk from "chalk";
import {
  buildTempFileName,
  camelCaseToCapitalized,
  camelCaseToKebabCase,
  camelCaseToUpperCase,
  camelToLabel,
  camelToSnakeCase
} from "./utils";
import * as ejs from "ejs";
import * as tmp from "tmp";
import * as path from "path";
import { execSync } from "child_process";
import { EnrichedField, input } from './input';
import * as fs from 'fs';

// Enrich JSON with field names formatted to various useful cases
console.log(chalk.yellow('Enriching input'));

const enrichedInput: { fields: EnrichedField [] } = input;
enrichedInput.fields.forEach((field) => {
  field.nameCamelCase = field.name;
  field.nameUpperCase = camelCaseToUpperCase(field.name);
  field.nameSnakeCase = camelToSnakeCase(field.name);
  field.nameCapitalized = camelCaseToCapitalized(field.name);
  field.nameKebabCase = camelCaseToKebabCase(field.name);
  field.nameLabel = camelToLabel(field.name);
})

const tmpDir = tmp.dirSync();
console.log(chalk.yellow('Created temp dir', tmpDir.name));

// This array contains the paths of the files to open at the end
const generatedFilePaths = [];

const templateFiles = fs.readdirSync('templates');
// Then, for each template, load, parse, and execute on the enriched model
templateFiles.forEach((templateFileName) => {
  const templatePath = path.join('templates', templateFileName);

  console.log(chalk.yellow('Loading template ' + templatePath));
  const template = readFileSync(templatePath, 'utf-8');

  console.log(chalk.yellow('Compiling template'));
  const compiledTemplate = ejs.compile(template);

  console.log(chalk.yellow('Applying template'));
  const result = compiledTemplate(enrichedInput);

  const tempFileName = buildTempFileName(templateFileName);
  const tempFilePath = path.join(tmpDir.name, tempFileName);
  console.log(chalk.blue('Writing result to ' + tempFilePath));
  writeFileSync(tempFilePath, result);

  generatedFilePaths.push(tempFilePath);
});

// Finally, for debug purposes, create a file with the enriched model and append it to the list of files to open
const modelFilePath = path.join(tmpDir.name, 'model.json');
writeFileSync(modelFilePath, JSON.stringify(enrichedInput, undefined, 2));
generatedFilePaths.push(modelFilePath)

/*
 * Opens the generated files.
 * You can uncomment the line that corresponds to your preferred editor
 */
execSync('edit ' + generatedFilePaths.join(' '));
// execSync('gedit ' + generatedFilePaths.join(' '));
// execSync('code ' + generatedFilePaths.join(' '));
