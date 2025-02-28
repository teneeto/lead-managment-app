"use client";

import React, { useState, useEffect } from "react";

import dynamic from "next/dynamic";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { JsonFormsCore } from "@jsonforms/core";
import { countries } from "@/utils/countries";
import { storage } from "@/lib/firebaseConfig";
import TextButton from "./TextButton";
import Link from "next/link";
import {
  Container,
  FileInput,
  FormSection,
  FormSectionDescription,
  FormSectionTitle,
  FormWrapper,
  LoadingIndicator,
  Logo,
  Section,
  SignInLink,
  SubmitButton,
  SuccessMessage,
  Title,
  TitleContainer,
} from "./styles";

const JsonForms = dynamic(
  () => import("@jsonforms/react").then((mod) => mod.JsonForms),
  { ssr: false }
);

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

const LeadForm: React.FC = () => {
  const [data, setData] = useState<LeadData>({});
  const [visaData, setVisaData] = useState<string[]>([]);
  const [textAreaData, setAreaTextAreaData] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<JsonFormsCore["errors"]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const storageRef = ref(storage, `resumes/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => console.error("Upload failed", error),
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setData((prev) => ({ ...prev, resume: downloadURL }));
        console.log("File available at", downloadURL);
      }
    );
  };

  const handleSubmit = async () => {
    console.log("data", { ...data, ...visaData, ...textAreaData });
    setSubmitted(true);

    if (errors?.length === 0) {
      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, ...visaData, ...textAreaData }),
        });

        if (response.ok) {
          setSubmissionStatus("Lead submitted successfully!");
          setData({});
        } else {
          setSubmissionStatus("Submission failed. Please try again.");
        }
      } catch (error) {
        setSubmissionStatus("An error occurred while submitting the form.");
      }
    }
  };

  return (
    <>
      <Section>
        <TitleContainer>
          <Logo
            src="/images/trans_logo.png"
            alt="Alma Logo"
            width={480 / 7}
            height={260 / 7}
          />
          <Title>
            Get An Assessment <br /> Of Your Immigration Case
          </Title>
        </TitleContainer>
      </Section>

      <Container>
        <FormWrapper>
          <FormSection>
            <img
              src="/images/file.png"
              alt="file icon"
              width={274 / 6}
              height={352 / 6}
            />
            <FormSectionTitle>
              Want to understand your visa options?
            </FormSectionTitle>
            <FormSectionDescription>
              Submit the form below and our team of experienced attorneys will
              review your information and send a preliminary assessment of your
              case based on your goals.
            </FormSectionDescription>
            {isMounted && (
              <JsonForms
                schema={visaOptions}
                uischema={uischema}
                data={data}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data, errors }: JsonFormsChangeEvent) => {
                  setData(data);
                  if (submitted) {
                    setErrors(errors ?? []);
                  }
                }}
              />
            )}
          </FormSection>

          <FormSection>
            <img
              src="/images/file.png"
              alt="file icon"
              width={274 / 6}
              height={352 / 6}
            />
            <FormSectionTitle>Visa Categories of Interest?</FormSectionTitle>
            {isMounted && (
              <JsonForms
                schema={visaCategories}
                uischema={visaUISchema}
                data={visaData}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data }) => setVisaData(data)}
              />
            )}
          </FormSection>

          <FormSection>
            <img
              src="/images/heart.png"
              alt="file icon"
              width={274 / 4.5}
              height={352 / 6}
            />
            <FormSectionTitle>How can we help you?</FormSectionTitle>
            {isMounted && (
              <JsonForms
                schema={textAreaSchema}
                uischema={textAreaUIschema}
                data={textAreaData}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data }) => setAreaTextAreaData(data)}
              />
            )}
          </FormSection>

          <FormSection>
            <FormSectionTitle>Resume / CV (file upload)</FormSectionTitle>
            <FileInput
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
            />
          </FormSection>

          <SubmitButton onClick={handleSubmit} disabled={loading}>
            Submit
          </SubmitButton>
          {loading && <LoadingIndicator>Submitting...</LoadingIndicator>}
          {submissionStatus && (
            <SuccessMessage>{submissionStatus}</SuccessMessage>
          )}

          <SignInLink>
            <Link href="/leads-list" passHref>
              <TextButton text="Sign In " />
            </Link>
            To View Leads List
          </SignInLink>
        </FormWrapper>
      </Container>
    </>
  );
};

export default LeadForm;
