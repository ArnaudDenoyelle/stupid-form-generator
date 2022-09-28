# Stupid form generator

This is a boilerplate to generate forms in your project.
It contains by default 2 example templates that are intended to be customized.

The input model is a list of fields, contained in `input.ts`

The model is then enriched in order to add attributes that can be useful in the templates, like field names formatted to
various cases : camel case, uppercase, kebab case etc.

Finally, the model is applied to each template in order to generate corresponding files

## Getting started
- Install dependencies : `npm install`
- Edit the list of fields in `input.ts`
- Generate the files : `npm start`

Files will be generated in a temporary directory and opened using the
command located at the end of `main.ts`

## Templates
Templates are in the `templates` directory.

The templates are based on [ejs](https://ejs.co/)

The default templates generate HTML/TS fields for Angular/Material forms.

## Customizing

You can :
- Add templates in the `templates` directory
- Add attributes to fields in `input.ts`
- Add attributes in the enriched model by modifying the code in `main.ts`
