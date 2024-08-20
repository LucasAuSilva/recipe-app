import './globals.css'

import { router } from "@/routes";
import { queryClient } from '@/lib/query-client';

import { Toaster } from 'sonner';
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from '@tanstack/react-query';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
