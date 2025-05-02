import Alert from "@/components/shared/Alert/Alert";

//TODO: Místo alertu tu bude circular loading
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
