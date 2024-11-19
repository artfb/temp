import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api";
import { Layout } from "./layout";
import { SearchUsers } from "./modules/users";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <SearchUsers />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
