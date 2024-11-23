import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api";
import { Layout } from "./layout";
import { SearchUsersPage } from "./modules/users";
import { ErrorBoundary } from "./components";

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <SearchUsersPage />
        </Layout>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
