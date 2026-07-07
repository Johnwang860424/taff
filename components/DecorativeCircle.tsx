import Logo from "@/components/Logo";

// 品牌雲朵浮水印：低透明度底紋（DESIGN.md 層次與深度）
const DecorativeCircle = () => {
  return (
    <div className="opacity-5 text-on-surface select-none">
      <Logo size={560} className="w-[80vw] max-w-[560px] h-auto" filled={true} />
    </div>
  );
};

export default DecorativeCircle;
