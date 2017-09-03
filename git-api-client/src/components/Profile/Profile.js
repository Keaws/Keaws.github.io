import { h, Component } from 'preact';
import { route } from 'preact-router';
import { HOME_ROUTE } from '../../path/path';
import Repo from '../Repo/Repo';
import API from '../../api/api';
import { FILTER_TYPE, DEFAULT_FILTERS, Filters } from '../Filters/Filters';
import ReposList from '../ReposList/ReposList';
import Sorting from '../Sorting/Sorting';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';

export class Profile extends Component {
	constructor(props) {
    super(props);
    
		this.state = {
			repos: null,
      loading: true,
      filters: DEFAULT_FILTERS,
      languages: [],
      sorting: {
        by: 'name',
        order: 'asc'
      },
      currentPage: 1
		}
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }
  
	async componentDidMount() {
    try {
      const res = await API.getRepos(this.props.user, this.state.currentPage);
      const shouldDisplayLoadMore = res.headers.get('Link') && res.headers.get('Link').includes('rel="next"');
      const repos = await res.json();

      await this.setStateAsync({
        repos,
        shouldDisplayLoadMore,
        loading: false,
        languages: [...new Set(repos.map(r => r.language).filter(l => l))]
      });
      console.log(this.state);
    } catch (err) {
      console.error(err);
    }
  }
  
  _changeFilter(type, state) {
    this.setState({
      filters: { ...this.state.filters, [type]: state }
    });
  }

  _changeSortType(type) {
    this.setState({
      sorting: { ...this.state.sorting, by: type }
    });
  }

  _changeSortOrder(order) {
    this.setState({
      sorting: { ...this.state.sorting, order: order }
    });
  }

  _getFilteredRepos( {HAS_OPEN_ISSUES, HAS_TOPICS, STARRED_TIMES, 
    UPDATED_AFTER, REPO_TYPE, LANGUAGE} )
  {
    return this.state.repos.filter(repo => {
      return (HAS_OPEN_ISSUES ? !!repo.open_issues_count : true)
        && (HAS_TOPICS ? !!repo.topics.length : true)
        && repo.stargazers_count >= STARRED_TIMES
        && (UPDATED_AFTER
           ? new Date(repo.pushed_at) > new Date(UPDATED_AFTER) 
           : true)
        && (REPO_TYPE && REPO_TYPE !== 'All' 
           ? (REPO_TYPE === 'Fork' ? repo.fork : !repo.fork) 
           : true)
        && (LANGUAGE && LANGUAGE !== 'All'
           ? repo.language === LANGUAGE 
           : true)
    });
  }

  _getSortedRepos(repos, {by, order}) {
    const sorted = [...repos];

    switch (by) {
      case 'name':
        sorted.sort((a, b) => a[by].localeCompare(b[by]));
        break;
      case 'pushed_at':
        sorted.sort((a, b) => new Date(a[by]) - new Date(b[by]));
        break;
      default:
        sorted.sort((a, b) => a[by] - b[by]);
        break;
    }

    order === 'desc' && sorted.reverse();
    
    return sorted;
  }

  async _loadMore () {
    this.setState({loading: true});

    try {
      const res = await API.getRepos(this.props.user, this.state.currentPage + 1);
      const shouldDisplayLoadMore = res.headers.get('Link').includes('rel="next"');
      const newRepos = await res.json();
  
      await this.setStateAsync({
        repos: [...this.state.repos, ...newRepos],
        shouldDisplayLoadMore,
        currentPage: this.state.currentPage + 1,
        loading: false,
        languages: [
          ...this.state.languages,
          ...[...new Set(newRepos.map(r => r.language).filter(l => l))]
        ]
      });
      console.log(this.state);
    } catch (err) {
      console.error(err);
    }
  }

	render({}, {loading, repos, filters, languages, sorting, shouldDisplayLoadMore}) {
    const filteredRepos = repos && this._getFilteredRepos(filters);
    const sortedRepos = repos && this._getSortedRepos(filteredRepos, sorting);

		return (
			<div>
				{loading
					? <p>Fetching...</p>
        			: repos.length > 0
						? (
              <div>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    route(`${HOME_ROUTE}/`)
                  }}>Back to search
                </a>

                <Filters 
                  languages={languages} 
                  filters={filters} 
                  onFilter={this._changeFilter.bind(this)} />

                <Sorting 
                  sortingParams={sorting} 
                  onSortType={this._changeSortType.bind(this)} 
                  onSortOrder={this._changeSortOrder.bind(this)} />
                  
                <ReposList repos={sortedRepos} />

                <LoadMoreButton
                  shouldDisplayLoadMore={shouldDisplayLoadMore}
                  onLoadMore={this._loadMore.bind(this)} />
							</div>
						)
						: <p>{this.props.user} doesn’t have any public repositories yet.</p>
				}
			</div>
		)
	}

}

export default Profile;
