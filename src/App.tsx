
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Transactions } from "./pages/Transactions/Transactions";

function App() {
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
       <Transactions/>
        <GlobalStyle />
      </ThemeProvider>
    </div>
  );
}

export default App;
