"use client";

import { Pagination, PaginationItems } from "@/app/leads-list/styles";
import { ArrowLeft2, ArrowRight2, ArrowDown } from "iconsax-react";

const Paginate: React.FC = () => {
  return (
    <Pagination>
      <PaginationItems>
        <ArrowLeft2 size={16} color="#c0c0c0" />
      </PaginationItems>
      <PaginationItems>1</PaginationItems>
      <PaginationItems>2</PaginationItems>
      <PaginationItems isSelected>3</PaginationItems>
      <PaginationItems>4</PaginationItems>
      <PaginationItems>
        <ArrowRight2 size={16} color="#3c3c3c" />
      </PaginationItems>
    </Pagination>
  );
};

export default Paginate;
