import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default async function Authentication({ children }: Props) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-200 py-10">
      {children}
    </div>
  );
}
