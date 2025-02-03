"use client";
import React, { useEffect, useState } from "react";

// type Props = React.InputHTMLAttributes<HTMLInputElement> & {
//   value: any;
//   rules?: any;
// };

const useFormValidation = (rules?: any) => {
  const [status, setStatus] = useState<boolean>(true);
  const [warningNode, setWarningNode] = useState<any>(null);

  const validate = (value: any) => {
    if (rules) {
      for (const [name, run] of Object.entries(rules)) {
        setStatus(true);

        if (typeof run === "function") {
          const result = run(value);

          if (result) {
            setWarningNode(result); // Set warning message
            setStatus(false); // Set status to false if there is a validation error
            return; // Stop further validation checks after first error
          }
        }
      }
    }

    // If no validation errors
    setWarningNode(null);
    setStatus(true);
  };

  return { status, warningNode, validate };
};

export default useFormValidation;
