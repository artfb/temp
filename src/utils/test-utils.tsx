import { render, RenderOptions } from "@testing-library/react";
import { ReactElement, ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
});

export const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) =>
  render(ui, {
    wrapper: AllTheProviders,
    ...options,
  });

// eslint-disable-next-line react-refresh/only-export-components
export { customRender as render };
