import { Component, ReactNode } from "react";

import "./SearchResults.css";

interface SearchResult {
  name: string;
  model: string;
}

interface SearchResultsProps {
  data: SearchResult[];
}

class SearchResults extends Component<SearchResultsProps> {
  render() {
    const { data } = this.props;
    return (
      <div className="searchresultscontainer">
        <div className="searchresultsheader">
          <div className="searchresultsitem">Name</div>
          <div className="searchresultsitem">Model</div>
        </div>
        {data.map(({ name, model }: SearchResult): ReactNode => {
          return (
            <div key={`${name}${model}`} className="searchresultsrow">
              <span className="searchresultsitem">{name}</span>
              <span className="searchresultsitem">{model}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default SearchResults;
