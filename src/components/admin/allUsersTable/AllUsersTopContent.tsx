"use client";

import { memo, useCallback } from "react";
import { FiChevronDown } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";

import Button from "@/components/shared/button/Button";
import { capitalize } from "@/lib/utils/string";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@heroui/react";

import columns from "./allUsersColumns";
import { useAllUsersTableContext } from "./AllUsersTableContext";

const AllUsersTopContent = memo(() => {
  const {
    filterValue,
    setFilterValue,
    setPage,
    visibleColumns,
    setVisibleColumns,
  } = useAllUsersTableContext();

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Hledat podle jména, nebo emailu..."
          startContent={<IoSearch />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<FiChevronDown className="text-small" />}
                variant="flat"
              >
                Sloupce
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem key={column.key} className="capitalize">
                  {capitalize(column.label)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
});

AllUsersTopContent.displayName = "AllUsersTopContent";

export default AllUsersTopContent;
