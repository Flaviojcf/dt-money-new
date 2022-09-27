import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Transactions } from "./pages/Transactions/Transactions";
import { TransactionProvider } from "./context/TransactionsContext";

function App() {
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <TransactionProvider>
          <Transactions />
        </TransactionProvider>
        <GlobalStyle />
      </ThemeProvider>
    </div>
  );
}

export default App;
