import { CircularProgress } from "@heroui/progress";

export default function Loading() {
  return (
    <section>
      <div className="w-full">
        <div>
          <CircularProgress aria-label="Loading..." color="primary" size="lg" />
        </div>
      </div>
    </section>
  );
}
