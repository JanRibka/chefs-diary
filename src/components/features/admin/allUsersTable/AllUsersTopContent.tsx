"use client";

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { IoSearch } from 'react-icons/io5';
import { useDebounce } from 'use-debounce';

import Button from '@/components/shared/button/Button';
import { capitalize } from '@/lib/utils/string';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@heroui/react';

import columns from './allUsersColumns';
import { useAllUsersTableContext } from './AllUsersTableContext';

const AllUsersTopContent = memo(() => {
  const isMounted = useRef(false);

  const {
    filterValue,
    setFilterValue,
    setPage,
    visibleColumns,
    setVisibleColumns,
  } = useAllUsersTableContext();

  // Local filter value debouncing
  const [localFilterValue, setLocalFilterValue] = useState<string>(filterValue);
  const [localFilterDebouncedValue] = useDebounce(localFilterValue, 500);
  useEffect(() => {
    if (localFilterDebouncedValue) {
      if (!isMounted.current) {
        isMounted.current = true;
        return;
      }

      setFilterValue(localFilterDebouncedValue);
      setPage(1);
    } else {
      setFilterValue("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localFilterDebouncedValue]);

  useEffect(() => {
    if (filterValue === localFilterValue) return;

    setLocalFilterValue(filterValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue]);

  // Clear filter value
  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-0 sm:gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Hledat podle jména, nebo emailu..."
          autoComplete="off"
          startContent={<IoSearch />}
          value={localFilterValue}
          onClear={() => onClear()}
          onValueChange={setLocalFilterValue}
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
