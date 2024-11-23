import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api";
import { Layout } from "./layout";
import { SearchUsersPage } from "./modules/users";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <SearchUsersPage />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
