interface SidebarProps {
  isOpen: boolean;
}
interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  visas: string[];
  resume: string;
  message: string;
  status: "PENDING" | "REACHED_OUT";
  country: string;
}

export type { SidebarProps, LeadData };
