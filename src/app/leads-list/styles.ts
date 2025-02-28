import styled from "styled-components";
import type { SidebarProps } from "./types";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const Sidebar = styled.div<SidebarProps>`
  width: 250px;
  height: 100%;
  background: linear-gradient(150deg, #d9dea5 0%, #ffffff 25%);
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: fixed;
  left: ${({ isOpen }) => (isOpen ? "0" : "-250px")};
  transition: left 0.3s ease-in-out;
  border-right: 1px solid #ececec;

  @media (min-width: 768px) {
    position: relative;
    left: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #000000;
  font-size: 24px;
  align-self: flex-end;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 50px;
`;

const StyledLink = styled(Link)<{ isActive: boolean }>`
  color: #000000;
  text-decoration: none;
  font-size: 18px;
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};

  &:hover {
    text-decoration: underline;
  }
`;

const MainContent = styled.div`
  width: 100%;
  padding: 0 20px 0 20px;

  @media (max-width: 767px) {
    margin-left: 0;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0 20px 0;
  background: #fff;
  color: #000;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border: 0.5px solid #ececec;
  border-bottom-width: 1px;
  border-radius: 12px;
  height: 85vh;
`;

const Logo = styled.img`
  margin-bottom: 20px;
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: #ececec;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-top: auto;
`;

const AvatarWrapper = styled.div`
  align-items: center;
  font-weight: bold;
  margin-top: auto;
  display: flex;
  gap: 10px;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  background: white;
  border: 0.5px solid #ececec;
  border-radius: 12px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th`
  border-bottom: 2px solid #ddd;
  padding: 12px;
  font-weight: 600;
`;

const Td = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 12px;
  color: #3c3c3c;
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

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin: 20px 0 20px 0;
`;
const PaginationItems = styled.div<{ isSelected?: boolean }>`
  border: ${({ isSelected }) => (isSelected ? "1px solid #000" : "none")};
  padding: 5px 10px;
`;

const TableHeadTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #c0c0c0;
  font-weight: normal;
`;

const DashboardHeading = styled.h1`
  font-size: 24px;
`;

export {
  DashboardHeading,
  TableHeadTitle,
  PaginationItems,
  Pagination,
  Button,
  Td,
  Th,
  Table,
  AvatarWrapper,
  TableWrapper,
  Avatar,
  Logo,
  Content,
  MenuButton,
  Header,
  MainContent,
  StyledLink,
  NavLinks,
  Sidebar,
  Container,
  CloseButton,
};
