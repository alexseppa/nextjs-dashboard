import LoginForm from '@/app/ui/login-form';
import AcmeLogo from '@/app/ui/acme-logo';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <Link href="/" className="flex h-20 items-end rounded-lg bg-blue-600 p-4 text-white">
          <div className="w-32"><AcmeLogo /></div>
        </Link>
        <LoginForm />
      </div>
    </main>
  );
}
