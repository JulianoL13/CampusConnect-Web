import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import NavBar from './page-forum/navbar';

export default function EditarPerfil() {
  return (
    <div className='h-screen bg-zinc-100'>
      <NavBar />
      <section className='p-4 w-1/2 mx-auto bg-white shadow-[rgba(0,_0,_0,_0.35)_0px_4px_8px] rounded-lg'>
        <div className='flex flex-col'>
          <span className='text-purple-800 font-semibold text-2xl'>Editar Perfil</span>
          <span className='text-sm text-zinc-500'>Atualize suas informações pessoais e acadêmicas</span>
        </div>

        <form className='grid grid-cols-2 gap-6 '>
          <div>
            <label htmlFor='nome-completo' className='text-purple-600 font-medium text-sm'>
              Nome Completo
            </label>
            <Input id='nome-completo' className='w-full border border-zinc-400' />
          </div>
          <div>
            <label htmlFor='email-academico' className='text-purple-600 font-medium text-sm'>
              E-mail acadêmico
            </label>
            <Input id='email-academico' className='w-full border border-zinc-400' />
          </div>
          <div>
            <label htmlFor='matricula' className='text-purple-600 font-medium text-sm'>
              Matrícula
            </label>
            <Input id='matricula' className='w-full border border-zinc-400' />
          </div>
          <div>
            <label htmlFor='curso' className='text-purple-600 font-medium text-sm'>
              Curso
            </label>
            <Input id='curso' className='w-full border border-zinc-400' />
          </div>
          <div className='col-span-2'>
            <label htmlFor='biografia' className='text-purple-600 font-medium text-sm'>
              Biografia
            </label>
            <Textarea id='biografia' className='w-full min-h-20 max-h-28 border border-zinc-400' />
          </div>

          <div>
            <label htmlFor='qual-seu-semestre' className='text-purple-600 font-medium text-sm'>
              Qual seu Semestre
            </label>
            <Input id='qual-seu-semestre' className='w-full border border-zinc-400' />
          </div>

          <div>
            <label htmlFor='cidade' className='text-purple-600 font-medium text-sm'>
              Cidade
            </label>
            <Input id='cidade' className='w-full border border-zinc-400' />
          </div>
          <Button type='submit' className='w-full col-span-2 bg-purple-600 hover:bg-purple-700'>
            Salvar Alterações
          </Button>
        </form>
      </section>
    </div>
  );
}
