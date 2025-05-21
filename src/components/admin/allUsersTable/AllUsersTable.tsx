"use client";

import { useMemo, useState } from "react";

import Spinner from "@/components/shared/spinner/Spinner";
import useGetAllUserPaginated from "@/lib/hooks/apiHooks/admin/useGetAllUsersPaginated";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

import columns from "./columns";

export default function AllUsersTable() {
  // State
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Data
  const { data, isLoading } = useGetAllUserPaginated(page, pageSize);

  // Constants
  const pages = useMemo(() => {
    return data.totalCount ? Math.ceil(data.totalCount / pageSize) : 0;
  }, [data.totalCount, pageSize]);

  // Bottom content
  const bottomContent = useMemo(() => {
    return (
      <div className="p-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [page, pages]);

  return (
    <Table
      isHeaderSticky
      aria-label="Všichni uživatelé"
      bottomContent={pages > 0 ? bottomContent : null}
      bottomContentPlacement="inside"
    >
      {/* TODO: Udelat si komponentu TableHeader a Table body */}
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={data.data}
        loadingContent={<Spinner />}
        loadingState={isLoading ? "loading" : "idle"}
      >
        {(item) => (
          <TableRow key={item.idUser}>
            {() => <TableCell>{item.userInfo.userName}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
