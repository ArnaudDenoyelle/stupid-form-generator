import path from "path";

// field-snake-case
export function camelToSnakeCase(str: string):string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

// FIELD_UPPER_CASE
export function camelCaseToUpperCase(str: string):string {
    return camelToSnakeCase(str).toUpperCase();
}

// FieldCapitalized
export function camelCaseToCapitalized(str: string):string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// field-kebab-case
export function camelCaseToKebabCase(str: string):string {
    return camelToSnakeCase(str).toLowerCase().replace(/_/g, '-');
}

// Field Label
export function camelToLabel(str: string):string {
    return camelCaseToCapitalized(str.replace(/[A-Z]/g, letter => ` ${letter}`));
}

/**
 * Build a file name based on the template file name
 *
 * /path/to/foo.ts.ejs => foo.ts
 */
export function buildTempFileName(templateFilePath: string): string {
    // /path/to/foo.ts.ejs => foo.ts.ejs
    const baseName = path.basename(templateFilePath);
    // Strip .ejs at the end of the template file name
    return baseName.substring(0, baseName.length - 4);
}