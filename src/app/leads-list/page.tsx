"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  visas: string[];
  resume: string;
  message: string;
  status: "PENDING" | "REACHED_OUT";
}

const Container = styled.div`
  padding: 40px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  background: #f5f5f5;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
`;

const Button = styled.button`
  padding: 8px 12px;
  color: white;
  background-color: #0052cc;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #003d99;
  }
`;

export default function LeadsListPage() {
  const [leads, setLeads] = useState<LeadData[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch("/api/leads");
        if (response.ok) {
          const data = await response.json();
          setLeads(data);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);

  const handleStatusChange = async (email: string, index: number) => {
    try {
      const response = await fetch("/api/leads", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, status: "REACHED_OUT" }),
      });

      if (response.ok) {
        const updatedLeads = [...leads];
        updatedLeads[index].status = "REACHED_OUT";
        setLeads(updatedLeads);
      } else {
        console.error("Failed to update lead status");
      }
    } catch (error) {
      console.error("Error updating lead status:", error);
    }
  };

  return (
    <Container>
      <h2>Leads List</h2>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>LinkedIn</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <tr key={index}>
              <Td>
                {lead.firstName} {lead.lastName}
              </Td>
              <Td>{lead.email}</Td>
              <Td>
                <a
                  href={lead.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Profile
                </a>
              </Td>
              <Td>{lead.status}</Td>
              <Td>
                {lead.status === "PENDING" && (
                  <Button onClick={() => handleStatusChange(lead.email, index)}>
                    Mark as Reached Out
                  </Button>
                )}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
