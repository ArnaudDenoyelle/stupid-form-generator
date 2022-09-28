export const input: { fields: Field [] } = {
  fields:
    [
      {
        name: "firstName",
        component: "TEXTFIELD",
        required: true,
        placeholder: "John"
      },
      {
        name: "lastName",
        component: "TEXTFIELD",
        required: true,
        placeholder: "Doe"
      },
      {
        name: "description",
        component: "TEXTAREA",
        required: false
      },
      {
        name: "country",
        component: "SELECT",
        required: false
      }
    ]
};

export type Component = "TEXTFIELD" | "TEXTAREA" | "SELECT";

export interface Field {
  name: string,
  component: Component,
  required: boolean,
  placeholder?: string
}

export interface EnrichedField extends Field {
  nameCamelCase?: string,
  nameUpperCase?: string,
  nameSnakeCase?: string,
  nameCapitalized?: string,
  nameKebabCase?: string,
  nameLabel?: string,
}