import { JsonFormsCore } from "@jsonforms/core";

interface LeadData {
  firstName?: string;
  lastName?: string;
  email?: string;
  country?: string;
  linkedin?: string;
  resume?: string;
  message?: string;
}

interface JsonFormsChangeEvent extends Pick<JsonFormsCore, "data" | "errors"> {}

export type { LeadData, JsonFormsChangeEvent };
