import { cx } from "@/utils/all";

export default function Label(props) {
  const margin = props.nomargin;

  return (
    <span
      className={cx(
        "inline-block px-2 py-2 text-[14px] font-bold leading-normal rounded-lg", // Typography styles
        !margin && "mt-2",
        "text-[#2d810d] bg-[#f6f6f6]" // Custom green text and light gray background
      )}
    >
      {props.children}
    </span>
  );
}
