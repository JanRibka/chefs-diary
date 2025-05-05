"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ClientReplaceProps {
  path: string;
}

export default function ClientReplace({ path }: ClientReplaceProps) {
  const router = useRouter();

  useEffect(() => {
    router.replace(path);
  }, [path, router]);

  return null;
}
