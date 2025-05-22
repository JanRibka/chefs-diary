"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { ADMIN_ALL_USERS_GRID_NAME } from "@/lib/constants/gridNames";
import useIsFirstRender from "@/lib/hooks/useIsFirstRender";
import TableSettingsType from "@/lib/types/common/TableSettingsType";
import {
  loadTableSettings,
  saveTableSettings,
} from "@/lib/utils/tableSettings";
import { Selection } from "@heroui/react";

import columns from "./allUsersColumns";

type AllUsersTableContext = {
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (page: number) => void;
  filterValue: string;
  setFilterValue: (value: string) => void;
  visibleColumns: Selection;
  setVisibleColumns: (value: Selection) => void;
};

export const AllUsersTableContext = createContext<AllUsersTableContext | null>(
  null
);

type Props = {
  children: ReactNode;
};

export function AllUsersTableContextProvider({ children }: Props) {
  const firstRender = useIsFirstRender();

  const defaultSettings: TableSettingsType = {
    page: 1,
    pageSize: 10,
    filterValue: "",
    visibleColumns: new Set(columns.map((item) => item.key)),
  };

  const [page, setPage] = useState<number>(defaultSettings.page);
  const [pageSize, setPageSize] = useState<number>(defaultSettings.pageSize);
  const [filterValue, setFilterValue] = useState<string>(
    defaultSettings.filterValue
  );
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    defaultSettings.visibleColumns
  );

  useEffect(() => {
    const settings = loadTableSettings(
      ADMIN_ALL_USERS_GRID_NAME,
      defaultSettings
    );

    setPage(settings.page);
    setPageSize(settings.pageSize);
    setFilterValue(settings.filterValue);
    setVisibleColumns(settings.visibleColumns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (firstRender) return;

    saveTableSettings(ADMIN_ALL_USERS_GRID_NAME, {
      page,
      pageSize,
      filterValue,
      visibleColumns,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, filterValue, visibleColumns]);

  return (
    <AllUsersTableContext.Provider
      value={{
        page,
        setPage,
        pageSize,
        setPageSize,
        filterValue,
        setFilterValue,
        visibleColumns,
        setVisibleColumns,
      }}
    >
      {children}
    </AllUsersTableContext.Provider>
  );
}

export function useAllUsersTableContext() {
  const context = useContext(AllUsersTableContext);
  if (!context) {
    throw new Error(
      "useAllUsersTableContext must be used within a AllUsersTableContextProvider"
    );
  }

  return context;
}
