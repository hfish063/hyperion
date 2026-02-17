import AuthHeader from "@/components/auth-header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-row space-x-4">
        <AuthHeader />
      </div>
      <hr />
      {children}
    </div>
  );
}
