import { Component } from "react";

type InputEvent = React.ChangeEvent<HTMLInputElement>;
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
type SearchResult = Record<string, string | number>[];

const localStorageSearchTermKey = 'search_term';
const searchAPI = `https://swapi.dev/api/starships?search=`;

interface SearchState {
  searchTerm: string,
  searchResults: SearchResult,
  loading: boolean,
}

interface SearchResults {
  results: SearchResult,
}

class Search extends Component<Record<string, never>, SearchState> {

  state: SearchState = {
    searchTerm: "",
    searchResults: [],
    loading: false,
  };

  fetchData = async (searchTerm: string) => {
    try {
      this.setState({ loading: true });
      const queryRequestURL = `${searchAPI}${searchTerm}`;
      const response = await fetch(queryRequestURL);
      const data = await response.json() as SearchResults;
      const searchResults : SearchResult = data.results;
      // TODO:
      // displaying results instead log to console
      console.log(searchResults);
      this.setState({ searchResults, loading: false });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ loading: false });
    }
  };

  async componentDidMount(): Promise<void> {
    const searchTerm = localStorage.getItem(localStorageSearchTermKey) ?? "";
    this.setState({
      searchTerm
    });
    await this.fetchData(searchTerm);
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
    (async () => {
      await this.fetchData(searchTerm);
    })().catch(err => {
      console.error(err);
    });
  }

  render () {
    return (
      <>
        <section>
          <h3>SWAPI</h3>
          <p>Please input search term for search in starships name or model, leaving blank empty will display first 10 results.</p>
          <div>
            <input type="text" value={this.state.searchTerm} onChange={this.handleSearchTermChange}/>
            <button onClick={this.handleSearchClick}>Search</button>
          </div>
          <p>Click Search button to confirm search</p>
        </section>
      </>
    )
  }

}

export default Search