import { bankById } from "@/data/finance";

export const BankLogo = ({ id, size = 40 }: { id: string; size?: number }) => {
  const b = bankById(id);
  const initials = b.name.split(" ").map(w => w[0]).slice(0, 2).join("");
  return (
    <div
      className="rounded-xl flex items-center justify-center font-bold text-white shrink-0 shadow-sm"
      style={{ width: size, height: size, background: b.logoColor, fontSize: size * 0.36 }}
      aria-label={b.name}
    >
      {initials}
    </div>
  );
};
