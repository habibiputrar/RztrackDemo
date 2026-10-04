import Image from "next/image";
import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return <Link href="/dashboard" className="brand" aria-label="RZTrack">
    <Image src="/logo.png" width={42} height={42} alt="Logo RZTrack" priority />
    {!compact && <span>RZ<span>Track</span></span>}
  </Link>;
}
