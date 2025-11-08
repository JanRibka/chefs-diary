import { memo, useCallback } from "react";

import { Pagination } from "@heroui/react";

import { useUnitGroupsTableContext } from "./UnitGroupsTableContext";

type Props = {
  pages: number;
  totalGroups: number;
};

const UnitGroupsBottomContent = memo(({ pages, totalGroups }: Props) => {
  const { page, setPage, pageSize, setPageSize } = useUnitGroupsTableContext();

  //TODO: Toto by mohlo b7t v utils spole4n0 pro v3echny gridy
  const onPageSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPageSize(Number(e.target.value));
      setPage(1);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  function getUnitGroupsCountLabel(): string {
    if (totalGroups === 1) return "skupina";
    if (totalGroups < 4) return "skupiny";
    return "skupin";
  }

  return (
    <div className="p-2 flex justify-center md:justify-between items-center">
      <span className="hidden md:block text-default-400 text-small">
        Celkem {totalGroups} {getUnitGroupsCountLabel()}
      </span>

      {pages > 1 && page <= pages && (
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      )}

      <label className="hidden md:flex items-center text-default-400 text-small">
        Záznamů na stránku:
        <select
          className="bg-transparent outline-none text-default-400 text-small"
          value={pageSize}
          onChange={onPageSizeChange}
        >
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </label>
    </div>
  );
});

UnitGroupsBottomContent.displayName = "UnitGroupsBottomContent";

export default UnitGroupsBottomContent;
