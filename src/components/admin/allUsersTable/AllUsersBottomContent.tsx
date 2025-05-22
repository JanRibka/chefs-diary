import { memo } from "react";

import { Pagination } from "@heroui/react";

import { useAllUsersTableContext } from "./AllUsersTableContext";

type Props = {
  pages: number;
};

const AllUsersBottomContent = memo(({ pages }: Props) => {
  const { page, setPage } = useAllUsersTableContext();

  if (pages === 0 || page > pages) return null;

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
});

AllUsersBottomContent.displayName = "AllUsersBottomContent";

export default AllUsersBottomContent;
