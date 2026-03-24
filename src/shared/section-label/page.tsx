type SectionLabelProps = {
  children: React.ReactNode;
};

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#d6ad08]">
      {children}
    </div>
  );
}