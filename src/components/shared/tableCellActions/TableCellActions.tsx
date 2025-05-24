import { HTMLAttributes } from "react";
import { CiEdit } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

import { mergeStyles } from "@/lib/utils/styles";
import { Tooltip } from "@heroui/react";

type Props = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  detailsLabel?: string;
  editLabel?: string;
  deleteLabel?: string;
};
// TODO: Uživatele bude možno i skrýt, nepujde o d něho nic vidět na webu
export default function TableCellActions({
  className,
  detailsLabel,
  editLabel,
  deleteLabel,
  ...restProps
}: Props) {
  return (
    <div
      className={mergeStyles("relative flex items-center gap-2", className)}
      {...restProps}
    >
      <Tooltip content={detailsLabel ?? "Detail"}>
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <IoEyeOutline />
        </span>
      </Tooltip>
      <Tooltip content={editLabel ?? "Editovat"}>
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <CiEdit />
        </span>
      </Tooltip>
      <Tooltip color="danger" content={deleteLabel ?? "Smazat"}>
        <span className="text-lg text-danger cursor-pointer active:opacity-50">
          <MdDeleteOutline />
        </span>
      </Tooltip>
    </div>
  );
}
