import { Component } from "react";

type InputEvent = React.ChangeEvent<HTMLInputElement>;
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

const localStorageSearchTermKey = 'search_term';

interface SearchState {
  searchTerm: string,
}

class Search extends Component<Record<string, never>, SearchState> {

  state: SearchState = {
    searchTerm: ""
  };

  componentDidMount(): void {
    const searchTerm = localStorage.getItem(localStorageSearchTermKey) ?? "";
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
    localStorage.setItem(localStorageSearchTermKey, searchTerm);
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