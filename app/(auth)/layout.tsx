export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center lg:p-10 p-5 min-h-screen bg-brand-cream">
      <div className="bg-white rounded-3xl border border-primary-light/40 shadow-xl shadow-primary/5 lg:p-10 p-5 w-full max-w-[672px] mx-auto">
        {children}
      </div>
    </div>
  );
}
