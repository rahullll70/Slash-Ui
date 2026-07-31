import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { logout } from '@/lib/actions/auth.action';
import jwt from 'jsonwebtoken';
import Link from 'next/link';

export default async function UserProfile() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!token) {
    redirect('/login');
  }

  let email: string;

  try {
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as {
      email: string;
    };

    email = decoded.email;
  } catch {
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

  // Static mock components list (You can update this with real DB data later)
  const savedComponents = [
    {
      id: '1',
      title: 'Hero Section',
      path: '/components/hero-section',
    },
    {
      id: '2',
      title: 'Navigation Bar',
      path: '/components/navbar',
    },
  ];

  return (
    <div className='flex items-center justify-center min-h-screen px-4 py-20 text-brand-light bg-brand-dark font-inter'>
      <main className='w-full max-w-xl'>
        {/* Header */}
        <header className='mb-10 text-center'>
          <p className='text-[10px] uppercase text-zinc-500 font-medium mb-3 font-inter'>
            Logged in as
          </p>

          <h1 className='text-2xl font-bold tracking-tight break-all md:text-3xl font-switzer text-brand-light'>
            {email}
          </h1>
        </header>

        {/* User Info Rows */}
        <div className='space-y-0 text-sm font-inter'>
          <div className='flex justify-between py-2 border-b border-white/5 text-[10px] uppercase text-zinc-500 mb-2 font-inter'>
            <span>Type</span>
            <span>Details</span>
          </div>

          <Row label='Action' value='Logout' isAction action={logout} />
          <Row label='Date of join' value={formattedDate} />
          <Row label='Membership' value='Free' />
          <Row label='Components Access' value='36+' />
        </div>

        {/* Unlock Button */}
        <Link
          href='/pricing'
          className='block w-full py-4 mt-5 font-semibold text-center transition-all cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-brand-light font-switzer duration-400 rounded-xl'
        >
          Unlock full access
        </Link>

        {/* ── SAVED COMPONENTS SECTION ── */}
        <div className='mt-12 space-y-0 text-sm font-inter'>
          <div className='flex justify-between py-2 border-b border-white/5 text-[10px] uppercase text-zinc-500 mb-2 font-inter'>
            <span>Saved Component</span>
            <span>Action</span>
          </div>

          {savedComponents.length > 0 ? (
            savedComponents.map((component) => (
              <div
                key={component.id}
                className='flex items-center justify-between py-5 border-b border-white/10 font-inter'
              >
                <span className='text-zinc-200'>{component.title}</span>
                <Link
                  href={component.path}
                  className='transition-colors cursor-pointer text-brand-light hover:text-zinc-400 font-inter'
                >
                  View
                </Link>
              </div>
            ))
          ) : (
            <div className='py-5 text-xs text-center border-b border-white/10 text-zinc-500'>
              No saved components found
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Row({
  label,
  value,
  isAction = false,
  action,
}: {
  label: string;
  value: string;
  isAction?: boolean;
  action?: () => Promise<void>;
}) {
  return (
    <div className='flex items-center justify-between py-5 border-b border-white/10 font-inter'>
      <span className='text-zinc-200'>{label}</span>

      {isAction && action ? (
        <form action={action}>
          <button
            type='submit'
            className='transition-colors cursor-pointer text-brand-light hover:text-red-400 font-inter'
          >
            {value}
          </button>
        </form>
      ) : (
        <span className='text-zinc-400'>{value}</span>
      )}
    </div>
  );
}