import { h } from 'preact';
import './Filters.css';

const FILTER_TYPE = {
  HAS_OPEN_ISSUES: 'HAS_OPEN_ISSUES',
  HAS_TOPICS: 'HAS_TOPICS',
  STARRED_TIMES: 'STARRED_TIMES',
  UPDATED_AFTER: 'UPDATED_AFTER',
  REPO_TYPE: 'REPO_TYPE',
  LANGUAGE: 'LANGUAGE'
}

const DEFAULT_FILTERS = {
  HAS_OPEN_ISSUES: false,
  HAS_TOPICS: false,
  STARRED_TIMES: 0,
  UPDATED_AFTER: null,
  REPO_TYPE: null,
  LANGUAGE: null
}

function Filters ( { filters, languages } ) {
    return (
      <div class="display-settings display-settings__filters">
          <h2>Filters:</h2>
          <ul>
              <li>
                <span>Type</span>
                <select onInput={(e) => this.props.onFilter(
                  FILTER_TYPE.REPO_TYPE, e.target.value
                )}>
                  <option value="All" 
                    selected={!filters.REPO_TYPE || filters.REPO_TYPE === 'All'}>
                    All
                  </option>
                  <option value="Fork"
                    selected={filters.REPO_TYPE === 'Fork'}>
                    Fork
                  </option>
                  <option value="Source" 
                    selected={filters.REPO_TYPE === 'Source'}>
                    Source
                  </option>
                </select>
              </li>

              <li>
                <span>Language</span>
                <select 
                  onInput={(e) => this.props.onFilter(
                    FILTER_TYPE.LANGUAGE, e.target.value
                  )}>
                  <option value="All"
                    selected={!filters.LANGUAGE || filters.LANGUAGE === 'All'}>
                    All
                  </option>
                  {
                    languages.map(lang => {
                      return <option value={lang} 
                        selected={filters.LANGUAGE === lang}>
                        {lang}
                      </option>
                    })
                  }
                </select>
              </li>

              <li>
                <label>Stars</label>
                <input
                  type="number"
                  checked={filters.STARRED_TIMES}
                  onInput={(e) => this.props.onFilter(
                    FILTER_TYPE.STARRED_TIMES, e.target.value
                  )}/>
              </li>

              <li>
                <label>Updated after</label>
                <input
                  type="date"
                  checked={filters.UPDATED_AFTER}
                  onInput={(e) => this.props.onFilter(
                    FILTER_TYPE.UPDATED_AFTER, e.target.value
                  )}/>
              </li>

              <li>
                <label>With issues</label>
                <input
                  type="checkbox"
                  checked={filters.HAS_OPEN_ISSUES}
                  onClick={(e) => this.props.onFilter(
                    FILTER_TYPE.HAS_OPEN_ISSUES, e.target.checked
                  )}/>
              </li>

              <li>
                <label>With topics</label>
                <input
                  type="checkbox"
                  checked={filters.HAS_TOPICS}
                  onClick={(e) => this.props.onFilter(
                    FILTER_TYPE.HAS_TOPICS, e.target.checked
                  )}/>
              </li>
          </ul>
      </div>
    )
}

export { FILTER_TYPE, DEFAULT_FILTERS, Filters }
