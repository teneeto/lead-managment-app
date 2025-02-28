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
import { storage } from "@/lib/firebaseConfig";

const JsonForms = dynamic(
  () => import("@jsonforms/react").then((mod) => mod.JsonForms),
  { ssr: false }
);

interface LeadData {
  firstName?: string;
  lastName?: string;
  email?: string;
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
  background-color: #f4f5f7;
  padding: 40px;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  font-weight: 600;
  color: #333;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  color: white;
  background-color: #0052cc;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #003d99;
  }
`;

const schema = {
  type: "object",
  properties: {
    firstName: { type: "string", title: "First Name" },
    lastName: { type: "string", title: "Last Name" },
    email: { type: "string", format: "email", title: "Email" },
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
  required: ["firstName", "lastName", "email", "linkedin", "message"],
};

const uischema = {
  type: "VerticalLayout",
  elements: [
    { type: "Control", scope: "#/properties/firstName" },
    { type: "Control", scope: "#/properties/lastName" },
    { type: "Control", scope: "#/properties/email" },
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
    setSubmitted(true);
    if (errors?.length === 0) {
      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
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
            onChange={({ data, errors }: JsonFormsChangeEvent) => {
              setData(data);
              if (submitted) {
                setErrors(errors || []);
              }
            }}
          />
        )}
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
        />
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        {submissionStatus && <p>{submissionStatus}</p>}
      </FormWrapper>
    </Container>
  );
};

export default LeadForm;
