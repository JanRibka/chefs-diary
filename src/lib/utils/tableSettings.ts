import TableSettingsType from "../types/common/TableSettingsType";

export function loadTableSettings(
  gridName: string,
  defaultValue: TableSettingsType = {
    page: 1,
    pageSize: 10,
    filterValue: "",
    visibleColumns: new Set([]),
    sortDescriptor: { column: "", direction: "ascending" },
  }
): TableSettingsType {
  if (typeof window === "undefined") return defaultValue;

  try {
    const raw = localStorage.getItem(gridName);
    const allSettings = raw ? JSON.parse(raw) : defaultValue;

    return {
      ...allSettings,
      visibleColumns: new Set(allSettings.visibleColumns),
    };
  } catch (err) {
    console.error("Error loading table settings:", err);
    return defaultValue;
  }
}

export function saveTableSettings(
  gridName: string,
  settings: TableSettingsType
) {
  if (typeof window === "undefined") return;

  try {
    const plainArray = Array.from(settings.visibleColumns);
    const serializableSettings = {
      ...settings,
      visibleColumns: plainArray,
    };

    localStorage.setItem(gridName, JSON.stringify(serializableSettings));
  } catch (err) {
    console.error("Error saving table settings:", err);
  }
}
