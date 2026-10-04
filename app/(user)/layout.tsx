import { AppShell } from "@/components/app-shell";
import { DataProvider } from "@/lib/data-provider";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <DataProvider><AppShell>{children}</AppShell></DataProvider>;
}
