import { useBanks } from "@/hooks/use-finance-api";

export const BankLogo = ({ id, size = 40 }: { id: string; size?: number }) => {
  const { data: banks = [] } = useBanks();
  const b = banks.find(bank => bank.id === id);
  if (!b) {
    return (
      <div
        className="rounded-xl flex items-center justify-center font-bold text-white shrink-0 shadow-sm bg-muted"
        style={{ width: size, height: size, fontSize: size * 0.36 }}
        aria-label="..."
      >
        ?
      </div>
    );
  }
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
