import React, { ButtonHTMLAttributes } from "react";

interface PrimaryButton {
  label: string;
  action?: () => void;
}

export default function PrimaryButton({ label, action }: PrimaryButton) {
  return (
    <button
      className="px-4 py-2 w-[90px] rounded-md bg-primary text-white"
      onClick={action}
    >
      {label}
    </button>
  );
}
