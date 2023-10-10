"use client";

import { useEffect, useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type FormButtonProps = {
  children?: React.ReactNode;
  className?: string;
};
export default function FormButton({ children, className }: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <div>
      {pending ? (
        <div>Loading...</div>
      ) : (
        <button type="submit" className={className ? className : "btn"}>
          {children ? children : "Submit"}
        </button>
        // <input type="submit" value="Submit" className="btn" />
      )}
    </div>
  );
}
