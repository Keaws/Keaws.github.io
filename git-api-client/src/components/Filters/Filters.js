import { h } from 'preact';

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
      <div>
          <p>Filters:</p>
          <ul>
              <li>
                <label>
                  Has open issues
                  <input
                      type="checkbox"
                      checked={filters.HAS_OPEN_ISSUES}
                      onClick={(e) => this.props.onFilter(
                        FILTER_TYPE.HAS_OPEN_ISSUES, e.target.checked
                      )}/>
                </label>
              </li>
              
              <li>
                <label>
                  Has topics
                  <input
                      type="checkbox"
                      checked={filters.HAS_TOPICS}
                      onClick={(e) => this.props.onFilter(
                        FILTER_TYPE.HAS_TOPICS, e.target.checked
                      )}/>
                </label>
              </li>

              <li>
                <label>
                  Stars
                  <input
                      type="number"
                      checked={filters.STARRED_TIMES}
                      onInput={(e) => this.props.onFilter(
                        FILTER_TYPE.STARRED_TIMES, e.target.value
                      )}/>
                </label>
              </li>

              <li>
                <label>
                  Updated after
                  <input
                      type="date"
                      checked={filters.UPDATED_AFTER}
                      onInput={(e) => this.props.onFilter(
                        FILTER_TYPE.UPDATED_AFTER, e.target.value
                      )}/>
                </label>
              </li>

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
          </ul>
      </div>
    )
}

export { FILTER_TYPE, DEFAULT_FILTERS, Filters }
