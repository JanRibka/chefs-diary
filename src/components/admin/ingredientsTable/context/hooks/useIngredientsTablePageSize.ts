import { useIngredientsTableContext } from "./useIngredientsTableContext";

export function useIngredientsTablePageSize() {
  const { state, actions } = useIngredientsTableContext();

  return {
    pageSize: state.pageSize,
    setPageSize: actions.setPageSize,
  } as const;
}
