interface Props {
  size?: "small" | "medium" | "large" | undefined;
}
export default function Loading({ size = "medium" }: Props) {
  const setSize = (size: "small" | "medium" | "large" | undefined) => {
    switch (size) {
      case "small":
        return "w-[30px] h-[30px] border-[5px]";
      case "medium":
        return "w-[50px] h-[50px] border-[8px]";
      case "large":
        return "w-[70px] h-[70px] border-[10px]";
    }
  };
  return (
    <span
      className={`animate-spin ${setSize(
        size
      )} border-solid border-gray-500 border-t-green-600 rounded-full`}
    />
  );
}
