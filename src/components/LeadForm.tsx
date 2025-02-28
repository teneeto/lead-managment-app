"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { JsonFormsCore } from "@jsonforms/core";
import { countries } from "@/utils/countries";
import { storage } from "@/lib/firebaseConfig";

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
  visas?: string[];
  resume?: string;
  message?: string;
}

interface JsonFormsChangeEvent extends Pick<JsonFormsCore, "data" | "errors"> {}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 50px 20px;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 550px;
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  font-weight: 700;
  color: #2c3e50;
`;

const FileInput = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 15px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background-color: #0052cc;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #003d99;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const LoadingIndicator = styled.div`
  margin-top: 10px;
  font-size: 1rem;
  color: #0052cc;
  font-weight: 600;
`;

const SuccessMessage = styled.p`
  color: green;
  font-weight: 600;
  margin-top: 10px;
`;

const schema = {
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
    visas: {
      type: "array",
      title: "Visa Categories of Interest",
      items: {
        type: "string",
        enum: ["O1", "EB2A", "EB2-NIW", "I don't know"],
      },
      uniqueItems: true,
    },
    resume: { type: "string", title: "Upload Resume (PDF)" },
    message: { type: "string", title: "How can we help you?", maxLength: 500 },
  },
  required: [
    "firstName",
    "lastName",
    "email",
    "country",
    "linkedin",
    "message",
  ],
};

const uischema = {
  type: "VerticalLayout",
  elements: [
    { type: "Control", scope: "#/properties/firstName" },
    { type: "Control", scope: "#/properties/lastName" },
    { type: "Control", scope: "#/properties/email" },
    { type: "Control", scope: "#/properties/country" },
    { type: "Control", scope: "#/properties/linkedin" },
    { type: "Control", scope: "#/properties/visas" },
    { type: "Control", scope: "#/properties/resume" },
    { type: "Control", scope: "#/properties/message" },
  ],
};

const LeadForm: React.FC = () => {
  const [data, setData] = useState<LeadData>({});
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

    uploadTask.on("state_changed", async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      setData((prev) => ({ ...prev, resume: downloadURL }));
    });
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Get An Assessment Of Your Immigration Case</Title>
        {isMounted && (
          <JsonForms
            schema={schema}
            uischema={uischema}
            data={data}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={({ data }) => setData(data)}
          />
        )}
        <FileInput
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
        />
        <SubmitButton disabled={loading}>Submit</SubmitButton>
        {loading && <LoadingIndicator>Submitting...</LoadingIndicator>}
        {submissionStatus && (
          <SuccessMessage>{submissionStatus}</SuccessMessage>
        )}
      </FormWrapper>
    </Container>
  );
};

export default LeadForm;
