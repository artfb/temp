import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { SearchUsers } from "./modules/users/components/SearchUsers";
import { queryClient } from "./api";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchUsers />
    </QueryClientProvider>
  );
}

export default App;
