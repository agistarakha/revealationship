"use client";
type GoToElementProps = {
  children?: string;
  className?: string;
  targetId: string;
};
export default function GoToElement({
  children,
  className,
  targetId,
}: GoToElementProps) {
  return (
    <>
      <button
        className={className}
        onClick={() => {
          const ele = document.getElementById(targetId);
          ele?.scrollIntoView({
            behavior: "smooth",
          });
        }}
      >
        {children}
      </button>
    </>
  );
}
