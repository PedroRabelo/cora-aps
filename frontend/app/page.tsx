import Link from "next/link";

export default function Home() {
  return (
    <div className="text-3xl">
      <ul>
        <li>
          <Link href="/admin">Acesso admin</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </div>
  )
}
