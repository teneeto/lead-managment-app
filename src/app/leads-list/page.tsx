"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";

import { usePathname } from "next/navigation";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import { ArrowDown } from "iconsax-react";
import Paginate from "@/components/Pagination";
import {
  Avatar,
  AvatarWrapper,
  Button,
  CloseButton,
  Container,
  Content,
  DashboardHeading,
  Header,
  Logo,
  MainContent,
  MenuButton,
  NavLinks,
  Sidebar,
  StyledLink,
  Table,
  TableHeadTitle,
  TableWrapper,
  Td,
  Th,
} from "./styles";
import type { LeadData } from "./types";

const DashboardLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const { data: session, status } = useSession();

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
      <Sidebar isOpen={isOpen}>
        <CloseButton onClick={() => setIsOpen(false)}>&times;</CloseButton>
        <Logo
          src="/images/trans_logo.png"
          alt="Alma Logo"
          width={480 / 7}
          height={260 / 7}
        />
        <NavLinks>
          <StyledLink href="/leads-list" isActive={pathname === "/leads-list"}>
            Leads
          </StyledLink>

          <StyledLink href="#" isActive={pathname === "#"}>
            Settings
          </StyledLink>
        </NavLinks>
        <AvatarWrapper>
          <Avatar>A</Avatar>
          Admin
        </AvatarWrapper>
      </Sidebar>
      <MainContent>
        <Header>
          <MenuButton onClick={() => setIsOpen(true)}>☰</MenuButton>
          <DashboardHeading>Leads</DashboardHeading>
        </Header>
        <Content>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <Th>
                    <TableHeadTitle>
                      Name <ArrowDown size={16} color="#c0c0c0" />
                    </TableHeadTitle>
                  </Th>
                  <Th>
                    <TableHeadTitle>
                      Submitted <ArrowDown size={16} color="#c0c0c0" />
                    </TableHeadTitle>
                  </Th>
                  <Th>
                    <TableHeadTitle>
                      Email <ArrowDown size={16} color="#c0c0c0" />
                    </TableHeadTitle>
                  </Th>
                  <Th>
                    <TableHeadTitle>
                      LinkedIn <ArrowDown size={16} color="#c0c0c0" />
                    </TableHeadTitle>
                  </Th>

                  <Th>
                    <TableHeadTitle>
                      Status <ArrowDown size={16} color="#c0c0c0" />
                    </TableHeadTitle>
                  </Th>
                  <Th>
                    <TableHeadTitle>
                      Country <ArrowDown size={16} color="#c0c0c0" />
                    </TableHeadTitle>
                  </Th>
                  <Th>
                    <TableHeadTitle>
                      Action <ArrowDown size={16} color="#c0c0c0" />
                    </TableHeadTitle>
                  </Th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, index) => (
                  <tr key={index}>
                    <Td>
                      {lead.firstName} {lead.lastName}
                    </Td>
                    <Td>time</Td>
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
                    <Td>{capitalizeFirstLetter(lead.status)}</Td>
                    <Td>{capitalizeFirstLetter(lead.country)}</Td>
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

          <Paginate />
        </Content>
      </MainContent>
    </Container>
  );
};

export default DashboardLayout;
