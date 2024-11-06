import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  return (
    <section className="w-full h-full flex justify-center items-center relative bg-purple-200">
      {/* <img src='src/assets/fundo1.png' alt='fundo1' className='w-[950px] absolute -rotate-[30deg] -left-[350px] -bottom-40' /> */}
      <article className="h-2/4 w-[30%] rounded-3xl bg-white flex items-center justify-center flex-col">
        <img
          src="src/assets/logo.png"
          alt="campus connect"
          className="w-40 mx-auto"
        />

        <div className="w-4/5 space-y-5 flex flex-col">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Senha" />
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
            Entrar
          </Button>
          <span className="mx-auto text-purple-700">Esqueceu sua Senha?</span>
        </div>
      </article>
    </section>
  );
}
