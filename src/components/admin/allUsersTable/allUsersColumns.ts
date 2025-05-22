import TableColumnType from "@/lib/types/common/TableColumnType";

const allUsersColumns: TableColumnType[] = [
  {
    label: "Uživatelské jméno",
    key: "userName",
    allowsSorting: true,
  },
  {
    label: "Email",
    key: "email",
    allowsSorting: true,
  },
  {
    label: "Email ověřen",
    key: "emailVerifiedAt",
    allowsSorting: true,
  },
  {
    label: "Účet vytvořen",
    key: "createdAt",
    allowsSorting: true,
  },
  {
    label: "Stav",
    key: "isDisabled",
  },
  {
    label: "Poslední úspěšné přihlášení",
    key: "lastSuccessfulLogIn",
    allowsSorting: true,
  },
  {
    label: "Úspěšná přihlášení",
    key: "successfulLoginNumber",
    allowsSorting: true,
  },
  {
    label: "Neúspěšná přihlášení",
    key: "failedLoginNumber",
    allowsSorting: true,
  },
];

export default allUsersColumns;
