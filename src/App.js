import { ResultTable } from "./components/ResultTable";
import "./styles/main.scss";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div>
        <ResultTable />
      </div>
    </Provider>
  );
}

export default App;
