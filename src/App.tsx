import { Component, ReactNode } from "react";
import "./App.css";
import ErrorBoundary from "./ErrorBoundary";
import Search from "./Search";
import AppFallback from "./AppFallback";

class App extends Component {

  clickChild!: (() => void);

  handleResetError = () => {
    this.clickChild();
  }

  render(): ReactNode {
    return (
      <ErrorBoundary 
        resetThrowedError={(click) => this.clickChild = click}
        fallback={
          <AppFallback handleResetError={this.handleResetError}/>
        }
      >
        <Search />
      </ErrorBoundary>
    );
  }
}

export default App;
