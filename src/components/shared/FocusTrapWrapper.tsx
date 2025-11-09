"use client";

import React, { useEffect, useRef, useState } from "react";

type Props = {
  active: boolean;
  children: React.ReactNode;
  focusTrapOptions?: any;
};

export default function FocusTrapWrapper({
  active,
  children,
  focusTrapOptions,
}: Props) {
  const [TrapComponent, setTrapComponent] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasTabbable, setHasTabbable] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) {
      setHasTabbable(false);
      return;
    }

    const tabbableSelector =
      'a[href], button:not([disabled]), textarea, input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const nodes = Array.from(
      el.querySelectorAll<HTMLElement>(tabbableSelector)
    );
    setHasTabbable(nodes.length > 0);
  }, [children, active]);

  useEffect(() => {
    let mounted = true;
    import("focus-trap-react")
      .then((mod) => {
        if (mounted) setTrapComponent(() => mod.default || mod);
      })
      .catch(() => {
        // library not available — silently fallback
        setTrapComponent(null);
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (TrapComponent) {
    const Trap = TrapComponent;
    // Only render the actual trap when it's active and there is at least one tabbable element.
    // If the trap would initialize without tabbables it throws; render a plain container instead.
    if (!active || !hasTabbable) {
      return <div ref={containerRef}>{children}</div>;
    }

    return (
      <div ref={containerRef}>
        <Trap active={true} focusTrapOptions={focusTrapOptions}>
          {children}
        </Trap>
      </div>
    );
  }

  // Fallback: render children as-is. Basic keyboard handling can be added externally.
  return <>{children}</>;
}
