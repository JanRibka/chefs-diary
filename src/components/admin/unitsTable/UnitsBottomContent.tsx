import { memo, useCallback } from "react";

import { Pagination } from "@heroui/react";

import { useUnitsTableContext } from "./UnitsTableContext";

type Props = {
  pages: number;
  totalUsers: number;
};

const UnitsBottomContent = memo(({ pages, totalUsers }: Props) => {
  const { page, setPage, pageSize, setPageSize } = useUnitsTableContext();

  const onPageSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPageSize(Number(e.target.value));
      setPage(1);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  function getUnitsCountLabel(): string {
    if (totalUsers === 1) return "jednotka";
    if (totalUsers < 4) return "jednotky";
    return "jednotek";
  }

  return (
    <div className="p-2 flex justify-center md:justify-between items-center">
      <span className="hidden md:block text-default-400 text-small">
        Celkem {totalUsers} {getUnitsCountLabel()}
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
          <option value="100">100</option>
        </select>
      </label>
    </div>
  );
});

UnitsBottomContent.displayName = "UnitsBottomContent";

export default UnitsBottomContent;
