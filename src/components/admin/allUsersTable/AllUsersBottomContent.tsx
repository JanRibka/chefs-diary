import { memo, useCallback } from 'react';

import { Pagination } from '@heroui/react';

import { useAllUsersTableContext } from './AllUsersTableContext';

type Props = {
  pages: number;
  totalUsers: number;
};

const AllUsersBottomContent = memo(({ pages, totalUsers }: Props) => {
  const { page, setPage, pageSize, setPageSize } = useAllUsersTableContext();

  const onPageSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPageSize(Number(e.target.value));
      setPage(1);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  function getUserCountLabel(): string {
    if (totalUsers === 1) return "uživatel";
    if (totalUsers < 5) return "uživatelé";
    return "uživatelů";
  }

  return (
    <div className="p-2 flex justify-center md:justify-between items-center">
      <span className="hidden md:block text-default-400 text-small">
        Celkem {totalUsers} {getUserCountLabel()}
      </span>

      {pages > 1 && page <= pages && (
        <>
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
          />

          <label className="hidden md:flex items-center text-default-400 text-small">
            Rows per page:
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
        </>
      )}
    </div>
  );
});

AllUsersBottomContent.displayName = "AllUsersBottomContent";

export default AllUsersBottomContent;
