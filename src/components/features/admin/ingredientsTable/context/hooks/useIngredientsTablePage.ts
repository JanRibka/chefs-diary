import { useIngredientsTableContext } from "./useIngredientsTableContext";

export function useIngredientsTablePage() {
  const { state, actions } = useIngredientsTableContext();

  return {
    page: state.page,
    setPage: actions.setPage,
  } as const;
}
