import { LoginForm } from "./LoginForm";
import LogoSvg from "../../../public/vercel.svg"
import Image from "next/image";

export default function LoginAdmin() {
  return (
    <>
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Image
              src={LogoSvg}
              className="mx-auto h-12 w-auto"
              alt="Logo da empresa"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Faça o login na sua conta
            </h2>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  )
}
