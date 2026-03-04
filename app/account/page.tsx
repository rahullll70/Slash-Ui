import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { logout } from '@/lib/actions/auth.action';
import Navbar from '@/components/ui/navbar';

export default async function UserProfile() {
  const cookieStore = await cookies(); 
  const email = cookieStore.get('user_email')?.value;

  if (!email) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    redirect('/login');
  }

  const formattedDate = new Date(user.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='min-h-screen bg-black text-white flex items-center justify-center px-4'>
        <Navbar /> 
      <main className='w-full max-w-xl'>
        <header className='mb-10 text-center'>
          <p className='text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium mb-3'>
            Logged in as
          </p>

          <h1 className='text-2xl md:text-3xl font-semibold tracking-tight break-all'>
            {email}
          </h1>
        </header>
        
        <div className='space-y-0 text-sm'>
          <div className='flex justify-between py-2 border-b border-white/5 text-[10px] uppercase tracking-widest text-gray-500 mb-2'>
            <span>Type</span>
            <span>Details</span>
          </div>

          
          <Row label='Action' value='Logout' isAction action={logout} />

          <Row label='Date of join' value={formattedDate} />
          <Row label='Membership' value='Free' />
          <Row label='Components Access' value='36+' />
        </div>
      </main>
    </div>
  );
}

function Row({
  label,
  value,
  isAction = false,
  action, // Add action prop
}: {
  label: string;
  value: string;
  isAction?: boolean;
  action?: () => Promise<void>;
}) {
  return (
    <div className='flex items-center justify-between py-5 border-b border-white/10'>
      <span className='text-gray-200'>{label}</span>
      {isAction && action ? (
        /* Use a form for the server action logout */
        <form action={action}>
          <button
            type='submit'
            className='text-white hover:text-red-400 transition-colors cursor-pointer'
          >
            {value}
          </button>
        </form>
      ) : (
        <span className='text-gray-400'>{value}</span>
      )}
    </div>
  );
}
