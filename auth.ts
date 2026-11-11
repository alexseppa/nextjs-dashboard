import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { compare } from 'bcrypt';
import { authConfig } from './auth.config';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email: string) {
  try {
    const users = await sql<{ id: string; name: string; email: string; password: string }[]>`
      SELECT id, name, email, password FROM users WHERE email = ${email} LIMIT 1
    `;
    return users[0];
  } catch {
    return undefined;
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = z.object({ email: z.string().email(), password: z.string().min(6) }).safeParse(credentials);
        if (!parsed.success) return null;
        const user = await getUser(parsed.data.email);
        if (!user || !(await compare(parsed.data.password, user.password))) return null;
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
});
