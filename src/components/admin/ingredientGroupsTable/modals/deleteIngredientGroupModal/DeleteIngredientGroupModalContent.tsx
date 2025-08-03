import Button from "@/components/shared/button/Button";
import Form from "@/components/shared/form/Form";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";
import { IngredientGroupWithAssignedIngredientsDTO } from "@/lib/dTOs/admin/IngredientGroupWithAssignedIngredientsDTO";

type Props = {
  group: IngredientGroupWithAssignedIngredientsDTO;
  onCancel: () => void;
  action: (formData: FormData) => void;
  isPending?: boolean;
};

export default function DeleteIngredientGroupModalContent({
  group,
  onCancel,
  action,
  isPending,
}: Props) {
  return (
    <Form action={action} className="flex flex-col gap-5" noValidate>
      <p>
        Opravdu chcete smazat skupinu <strong>{group?.name}</strong>?
      </p>
      <div className="flex py-2 px-1 justify-between">
        <Button color="success" variant="flat" onPress={onCancel}>
          Zrušit
        </Button>
        <SubmitButton color="danger" disabled={isPending} isLoading={isPending}>
          Smazat
        </SubmitButton>
      </div>
    </Form>
  );
}
