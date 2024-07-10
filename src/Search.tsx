import { Component } from "react";
import SearchResults from "./SearchResults";

type InputEvent = React.ChangeEvent<HTMLInputElement>;
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

const localStorageSearchTermKey = "search_term";
const searchAPI = `https://swapi.dev/api/starships?search=`;

interface ISearchResults {
  name: string;
  model: string;
}

interface ISearchResult {
  results: ISearchResults[];
}

interface SearchState {
  searchTerm: string;
  searchResult: ISearchResults[];
  loading: boolean;
  errorThrowed: boolean;
}

class Search extends Component<Record<string, never>, SearchState> {
  state: SearchState = {
    searchTerm: "",
    searchResult: [],
    loading: false,
    errorThrowed: false,
  };

  fetchData = async (searchTerm: string): Promise<void> => {
    try {
      this.setState({ loading: true });
      const queryRequestURL = `${searchAPI}${searchTerm}`;
      const response = await fetch(queryRequestURL);
      const data = (await response.json()) as ISearchResult;
      const searchResult: ISearchResults[] = data.results;
      this.setState({ searchResult, loading: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false });
    }
  };

  async componentDidMount(): Promise<void> {
    const searchTerm = localStorage.getItem(localStorageSearchTermKey) ?? "";
    this.setState({
      searchTerm,
    });
    await this.fetchData(searchTerm);
  }

  handleSearchTermChange = (e: InputEvent): void => {
    this.setState({
      searchTerm: e.target.value,
    });
  };

  handleSearchClick = (e: ButtonEvent): void => {
    const { searchTerm } = this.state;
    const searchTermTrimmed = searchTerm.trim();
    localStorage.setItem(localStorageSearchTermKey, searchTermTrimmed);
    e.preventDefault();
    (async () => {
      await this.fetchData(searchTermTrimmed);
    })().catch((err) => {
      console.error(err);
    });
  };

  handleThrowErrorClick = (e: ButtonEvent): void => {
    console.log("handleThrowErrorClick");
    this.setState({
      errorThrowed: true,
    });
    e.preventDefault();
  };

  render() {
    const { searchTerm, loading, searchResult, errorThrowed } = this.state;
    if (errorThrowed) {
      throw new Error("Simulated error.");
    }
    return (
      <>
        <section>
          <h3>SWAPI</h3>
          <p>
            Please input search term for search in starships name or model,
            leaving blank empty will display first 10 results.
          </p>
          <div>
            <input
              type="text"
              value={searchTerm}
              onChange={this.handleSearchTermChange}
            />
            <button onClick={this.handleSearchClick} id="buttonSearch">
              Search
            </button>
            <button onClick={this.handleThrowErrorClick} id="buttonThrowError">
              Throw Error
            </button>
          </div>
          <p>Click Search button to confirm search</p>
        </section>
        <section>
          {loading ? (
            <h2>LOADING...</h2>
          ) : (
            <SearchResults data={searchResult} />
          )}
        </section>
      </>
    );
  }
}

export default Search;
