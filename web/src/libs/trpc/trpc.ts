import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '../../../../api/src/routes/app-router'
export const trpc = createTRPCReact<AppRouter>()
