"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

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
  background-color: #f4f5f7;
  min-height: 100vh;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th`
  border-bottom: 2px solid #ddd;
  padding: 12px;
  background: #f5f5f5;
  font-weight: 600;
`;

const Td = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 12px;
`;

const Button = styled.button`
  padding: 8px 12px;
  color: white;
  background-color: #0052cc;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #003d99;
  }
`;

export default function LeadsListPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [leads, setLeads] = useState<LeadData[]>([]);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      signIn();
    }
  }, [session, status]);

  useEffect(() => {
    if (session) {
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
    }
  }, [session]);

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

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Redirecting to login...</p>;

  return (
    <Container>
      <h2>Leads List</h2>
      <TableWrapper>
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
                    <Button
                      onClick={() => handleStatusChange(lead.email, index)}
                    >
                      Mark as Reached Out
                    </Button>
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
}
