import AppRoutes from "./routes";
import { ThemeProvider } from "./context/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;