import Link from "next/link";

export default function Home() {
  return (
    <h1 className="text-3xl">
      <Link href="/admin">Acesso admin</Link>
    </h1>
  )
}
