import { h } from 'preact';
import './Sorting.css';

export default function Sorting ( { sortingParams } ) {
    return (
      <div class="display-settings">
          <h2>Sorting:</h2>
          <select onChange={(e) => this.props.onSortType(e.target.value)}>
            <option value="name"
              selected={!sortingParams.by || sortingParams.by === 'name'}>
              Name
            </option>
            <option value="stargazers_count" 
              selected={sortingParams.by === 'stargazers_count'}>
              Stars
            </option>
            <option value="open_issues_count" 
              selected={sortingParams.by === 'open_issues_count'}>
              Open Issues
            </option>
            <option value="pushed_at" 
              selected={sortingParams.by === 'pushed_at'}>
              Updated date
            </option>
          </select>

          <button 
            class="order"
            onClick={(e) => this.props.onSortOrder(e.target.value)}
            value={(!sortingParams.order || sortingParams.order === 'asc') ? 'asc' : 'desc'}>
            {(!sortingParams.order || sortingParams.order === 'asc') ? '🠉' : '🠋'}
          </button>
      </div>
    )
}

