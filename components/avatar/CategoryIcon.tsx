import React from "react";
import { ShirtIcon } from "lucide-react";
import { AvatarCategory } from "@/lib/avatar/types";

const ICON_PATHS: Partial<Record<AvatarCategory, React.ReactNode>> = {
  head: (
    <>
      <path d="M12 3c-4 0-6.5 2.8-6.5 7v2.5c0 4.5 2.9 8.5 6.5 8.5s6.5-4 6.5-8.5V10c0-4.2-2.5-7-6.5-7z" />
      <path d="M5.5 11.5c-1.2 0-1.8.9-1.6 2 .2 1.2 1 1.8 1.9 1.7M18.5 11.5c1.2 0 1.8.9 1.6 2-.2 1.2-1 1.8-1.9 1.7" />
    </>
  ),
  hair: (
    <>
      <path d="M4.5 14C4 7.8 7.5 3.5 12 3.5s8 4.3 7.5 10.5c-1-2.6-3-4.1-5.5-4.6-1.6 1.7-4.6 2.6-7.6 2.6-.8.6-1.4 1.2-1.9 2z" />
      <path d="M6.5 13.5V15c0 3.5 2.4 6.5 5.5 6.5s5.5-3 5.5-6.5v-1.5" />
    </>
  ),
  eyebrows: (
    <>
      <path d="M3.5 11c1.8-2.4 4.8-2.9 7-1.6M20.5 11c-1.8-2.4-4.8-2.9-7-1.6" />
      <circle cx="7.5" cy="15.5" r="1.3" fill="currentColor" stroke="none" opacity="0.45" />
      <circle cx="16.5" cy="15.5" r="1.3" fill="currentColor" stroke="none" opacity="0.45" />
    </>
  ),
  eyes: (
    <>
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  nose: (
    <>
      <path d="M11 4.5c0 4.5 1.6 6.8 3.6 8.8 1.4 1.4.7 3.9-1.5 3.9H11" />
      <path d="M8.3 17.2c.7-.9 1.6-1.3 2.7-1.3" />
    </>
  ),
  mouth: (
    <>
      <path d="M3.5 11.5c2.5.2 4.5-1.8 6-1.8 1 0 1.5.6 2.5.6s1.5-.6 2.5-.6c1.5 0 3.5 2 6 1.8-1.5 3-4.5 5-8.5 5s-7-2-8.5-5z" />
      <path d="M3.5 11.5h17" />
    </>
  ),
  extras: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <g fill="currentColor" stroke="none">
        <circle cx="7.8" cy="12.6" r="0.9" />
        <circle cx="10" cy="14.2" r="0.9" />
        <circle cx="7.6" cy="15.6" r="0.9" />
        <circle cx="16.2" cy="12.6" r="0.9" />
        <circle cx="14" cy="14.2" r="0.9" />
        <circle cx="16.4" cy="15.6" r="0.9" />
      </g>
    </>
  ),
  hats: (
    <>
      <path d="M7 14.5 8.3 7.3c.2-1.2 1.4-1.9 2.5-1.4l1.2.5 1.2-.5c1.1-.5 2.3.2 2.5 1.4L17 14.5" />
      <path d="M17.5 13.4c2.4.5 4 1.2 4 2.1 0 1.8-4.3 3-9.5 3s-9.5-1.2-9.5-3c0-.9 1.6-1.6 4-2.1" />
      <path d="M7 14.5c1.5.5 3.1.7 5 .7s3.5-.2 5-.7" />
    </>
  ),
  accessories: (
    <>
      <circle cx="6.5" cy="13.5" r="3.5" />
      <circle cx="17.5" cy="13.5" r="3.5" />
      <path d="M10 13.2c1.3-.8 2.7-.8 4 0M3 13.5 2 9.5M21 13.5l1-4" />
    </>
  ),
  texture: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <g fill="currentColor" stroke="none">
        <circle cx="8" cy="8" r="1.6" />
        <circle cx="12" cy="8" r="1.2" />
        <circle cx="16" cy="8" r="0.8" />
        <circle cx="8" cy="12" r="1.2" />
        <circle cx="12" cy="12" r="0.8" />
        <circle cx="16" cy="12" r="0.5" />
        <circle cx="8" cy="16" r="0.8" />
        <circle cx="12" cy="16" r="0.5" />
      </g>
    </>
  ),
};

export const CategoryIcon: React.FC<{ category: AvatarCategory; className?: string }> = ({
  category,
  className,
}) => {
  if (category === "body") return <ShirtIcon className={className} />;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICON_PATHS[category]}
    </svg>
  );
};
