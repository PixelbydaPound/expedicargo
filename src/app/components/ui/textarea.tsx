import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none placeholder:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md px-3 py-2 text-base transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800",
        "focus:border-blue-600 dark:focus:border-blue-500 focus:bg-gradient-to-br focus:from-blue-50 focus:to-white dark:focus:from-blue-950/20 dark:focus:to-gray-800",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
