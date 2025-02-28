"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { storage } from "../lib/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

interface LeadData {
  firstName?: string;
  lastName?: string;
  email?: string;
  linkedin?: string;
  visas?: string[];
  resume?: string;
  message?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
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

  return (
    <Container>
      <FormWrapper>
        <h2>Get An Assessment Of Your Immigration Case</h2>
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data }) => setData(data)}
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
        />
        <button onClick={() => console.log(data)}>Submit</button>
      </FormWrapper>
    </Container>
  );
};

export default LeadForm;
