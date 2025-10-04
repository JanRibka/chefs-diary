import { TableColumn } from "@/lib/types/common/table";

function getIngredientsColumns(canEditOrDelete: boolean): TableColumn[] {
  const columns: TableColumn[] = [
    {
      label: "Název ingredience",
      key: "name",
      allowsSorting: true,
    },
    {
      label: "Patří do skupin",
      key: "ingredientGroupNames",
    },
  ];

  if (canEditOrDelete) {
    columns.push({
      label: "Akce",
      key: "actions",
      width: 100,
    });
  }

  return columns;
}

export default getIngredientsColumns;
