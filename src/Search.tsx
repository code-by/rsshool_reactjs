import { Component } from "react";
import SearchResults from "./SearchResults";

type InputEvent = React.ChangeEvent<HTMLInputElement>;
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

const localStorageSearchTermKey = 'search_term';
const searchAPI = `https://swapi.dev/api/starships?search=`;

interface ISearchResults {
  name: string,
  model: string,
};

interface ISearchResult {
  results: ISearchResults[]
}

interface SearchState {
  searchTerm: string,
  searchResult: ISearchResults[],
  loading: boolean,
}

class Search extends Component<Record<string, never>, SearchState> {

  state: SearchState = {
    searchTerm: "",
    searchResult: [],
    loading: false,
  };

  fetchData = async (searchTerm: string) => {
    try {
      this.setState({ loading: true });
      const queryRequestURL = `${searchAPI}${searchTerm}`;
      const response = await fetch(queryRequestURL);
      const data = await response.json() as ISearchResult;
      const searchResult : ISearchResults[] = data.results;
      this.setState({ searchResult, loading: false });
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
    const { searchTerm, loading, searchResult } = this.state;
    return (
      <>
        <section>
          <h3>SWAPI</h3>
          <p>Please input search term for search in starships name or model, leaving blank empty will display first 10 results.</p>
          <div>
            <input type="text" value={searchTerm} onChange={this.handleSearchTermChange}/>
            <button onClick={this.handleSearchClick}>Search</button>
          </div>
          <p>Click Search button to confirm search</p>
        </section>
        <section>
          {loading ? (
            <h2>LOADING...</h2>
          ) : (
            <SearchResults
              data={searchResult}
            />
          )}
        </section>
      </>
    )
  }

}

export default Search