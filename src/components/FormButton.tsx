"use client";

import { useEffect, useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function FormButton() {
  const { pending } = useFormStatus();

  return (
    <div>
      {pending ? (
        <div>Loading...</div>
      ) : (
        <input type="submit" value="Upload" className="btn" />
      )}
    </div>
  );
}
