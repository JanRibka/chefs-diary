import Button from "@/components/shared/button/Button";
import Form from "@/components/shared/form/Form";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";
import { Unit } from "@prisma/client";

type Props = {
  unit: Unit;
  onCancel: () => void;
  action: (formData: FormData) => void;
  isPending?: boolean;
};

export default function DeleteUnitModalContent({
  unit,
  onCancel,
  action,
  isPending,
}: Props) {
  return (
    <Form action={action} className="flex flex-col gap-5" noValidate>
      <p>
        Opravdu chcete smazat jednotku <strong>{unit?.name}</strong>?
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
