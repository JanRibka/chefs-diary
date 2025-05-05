"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  path: string;
}

export default function ClientReplace({ path }: Props) {
  const router = useRouter();

  useEffect(() => {
    router.replace(path);
  }, [path, router]);

  return null;
}
