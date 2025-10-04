import { useIngredientsTableContext } from "./useIngredientsTableContext";

export function useIngredientsTableSortDescriptor() {
  const { state, actions } = useIngredientsTableContext();

  return {
    sortDescriptor: state.sortDescriptor,
    setSortDescriptor: actions.setSortDescriptor,
  } as const;
}
