import { Component } from "react";

type InputEvent = React.ChangeEvent<HTMLInputElement>;
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

interface SearchState {
  searchTerm: string,
}

class Search extends Component<Record<string, never>, SearchState> {

  state: SearchState = {
    searchTerm: ""
  };

  componentDidMount(): void {
    // TODO:
    // read searchTerm from localstorage
    const searchTerm = "";
    this.setState({
      searchTerm
    });    
  }

  handleSearchTermChange = (e: InputEvent) : void => {
    this.setState({
      searchTerm: e.target.value
    });
  }

  handleSearchClick = (e: ButtonEvent) : void => {
    const { searchTerm } = this.state;
    // TODO:
    // save searchTerm to localstorage
    console.log(searchTerm);
    e.preventDefault();
  }

  render () {
    return (
      <>
      <section>
        <div>
          <input type="text" value={this.state.searchTerm} onChange={this.handleSearchTermChange}/>
          <button onClick={this.handleSearchClick}>Search</button>
        </div>
        </section>
      </>
    )
  }

}

export default Search