import Alert from "@/components/shared/Alert/Alert";

export default function Loading() {
  return (
    <section>
      <div className="w-full">
        <Alert
          title="Probíhá ověřování vaší e-mailove adresy"
          color="default"
          variant="faded"
        />
      </div>
    </section>
  );
}
