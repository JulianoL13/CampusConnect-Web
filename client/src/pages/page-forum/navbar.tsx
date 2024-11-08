import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { CirclePlus } from 'lucide-react';

export default function NavBar() {
  return (
    <nav className='bg-purple-600 px-12 py-1 flex items-center justify-between'>
      <img src='src/assets/logo_branca.png' alt='logo' className='w-36' />
      <div className='flex justify-center items-center gap-x-5'>
        <a href={`/forum`} className='text-sm bg-white px-3 py-1.5 gap-x-2 text-purple-600 rounded-md'>
          Home
        </a>

        <button className='flex items-center text-sm bg-white px-3 py-1.5 gap-x-2 text-purple-600 rounded-md'>
          <CirclePlus size={18} />
          Criar Post
        </button>

        {/* Perfil */}
        <Popover>
          <PopoverTrigger>
            <button className='border-2 border-purple-700 rounded-full'>
              <img src='src/assets/foto_fake.png' alt='foto' className='w-12 rounded-full' />
            </button>
          </PopoverTrigger>
          <PopoverContent className=' mr-10 mt-2'>
            <div className='min-w-40 text-sm rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_4px_8px]'>
              <div className='p-2 flex flex-col'>
                <span>João Silva</span>
                <span className='text-xs text-zinc-500'>joao.silva@email.com</span>
              </div>

              <div className='p-2 gap-y-2 flex flex-col'>
                <hr className='border-t-2 border-zinc-200' />
                <a href={`/perfil`} className=' px-3 py-1 hover:bg-zinc-200 rounded-lg '>
                  Perfil
                </a>
                <a href='' className='px-3 py-1 hover:bg-zinc-200 rounded-lg '>
                  Alterar Senha
                </a>
                <hr className='border-t-2 border-zinc-200' />
                <a href={`/login`} className='px-3 py-1 hover:bg-zinc-200 rounded-lg '>
                  Sair
                </a>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
}
