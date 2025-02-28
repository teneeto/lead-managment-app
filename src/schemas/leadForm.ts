import { countries } from "@/utils/countries";

const visaOptions = {
  type: "object",
  properties: {
    firstName: { type: "string", title: "First Name" },
    lastName: { type: "string", title: "Last Name" },
    email: { type: "string", format: "email", title: "Email" },
    country: {
      type: "string",
      title: "Country of Citizenship",
      enum: countries,
    },
    linkedin: { type: "string", title: "LinkedIn Profile" },
  },
  required: ["firstName", "lastName", "email", "country", "linkedin"],
};
const textAreaSchema = {
  type: "object",
  properties: {
    message: { type: "string", title: "How can we help you?", maxLength: 500 },
  },
};

const visaCategories = {
  type: "object",
  properties: {
    visas: {
      type: "array",
      items: {
        type: "string",
        enum: ["O1", "EB2A", "EB2-NIW", "I don't know"],
      },
      uniqueItems: true,
    },
  },
};

const uischema = {
  type: "VerticalLayout",
  elements: [
    { type: "Control", scope: "#/properties/firstName" },
    { type: "Control", scope: "#/properties/lastName" },
    { type: "Control", scope: "#/properties/email" },
    { type: "Control", scope: "#/properties/country" },
    { type: "Control", scope: "#/properties/linkedin" },
  ],
};

const textAreaUIschema = {
  type: "Control",
  scope: "#/properties/message",
};

const visaUISchema = {
  type: "Control",
  scope: "#/properties/visas",
  options: {
    format: "radio",
  },
};

export {
  visaCategories,
  visaOptions,
  visaUISchema,
  textAreaSchema,
  textAreaUIschema,
  uischema,
};
