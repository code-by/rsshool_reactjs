import { Component, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  handleResetError: React.MouseEventHandler
}

class AppFallback extends Component<Props> {
  render(): ReactNode {
    return (
      <>
      <h2>Ups, it did it again...</h2>
        <div>
          <button onClick={this.props.handleResetError} id="buttonResetError" >{'Reset Error'}</button>
        </div>
      </>
    );
  }
}

export default AppFallback;
