export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center lg:p-10 p-5 min-h-screen bg-[url('/images/auth/auth-layout-bg.png')] bg-cover bg-center">
      <div className="bg-white rounded-3xl lg:p-10 p-5 w-full max-w-[672px] mx-auto ">
        {children}
      </div>
    </div>
  );
}
