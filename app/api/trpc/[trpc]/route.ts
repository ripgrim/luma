import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { type NextRequest } from 'next/server';
import { appRouter } from '@/server/root';
import { createContext } from '@/server/trpc';

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => {
      const mockRes = { 
        setHeader: (_name: string, _value: string | string[]) => { /* no-op */ },
      } as any;
      return createContext({ req, res: mockRes });
    },
  });

export { handler as GET, handler as POST }; 