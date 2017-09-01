import { h, Component } from 'preact';
import Repo from '../Repo/Repo';
import API from '../../api/api';
import { FILTER_TYPE, DEFAULT_FILTERS, Filters } from '../Filters/Filters';
import ReposList from '../ReposList/ReposList';
import Sorting from '../Sorting/Sorting';

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
      }
		}
	}

	componentDidMount() {
		API.getRepos(this.props.user)
			.then(res => res.json())
			.then(repos => {
				this.setState({
					repos,
          loading: false,
          languages: [...new Set(
            repos.map(r => r.language).filter(l => l)
          )]
        });
        console.log(repos);
			})
			.catch(err => console.error(err));
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

  _sortRepos(repos, {by, order}) {
    let sorted = [];

    switch (by) {
      case 'name':
        sorted = repos.sort((a,b) => a[by].localeCompare(b[by]));
        break;
      case 'pushed_at':
        sorted = repos.sort((a,b) => new Date(a[by]) - new Date(b[by]));
        break;
      default:
        sorted = repos.sort((a,b) => a[by] - b[by]);
        break;
    }

    order === 'desc' && sorted.reverse();
    
    return sorted;
  }

	render({}, {loading, repos, filters, languages, sorting}) {
    const filteredRepos = repos && this._getFilteredRepos(filters);
    const sortedRepos = repos && this._sortRepos(filteredRepos, sorting);

		return (
			<div>
				{loading
					? <p>Fetching...</p>
        			: repos.length > 0
						? (
							<div>
                <Filters 
                  languages={languages} 
                  filters={filters} 
                  onFilter={this._changeFilter.bind(this)} />

                <Sorting 
                  sortingParams={sorting} 
                  onSortType={this._changeSortType.bind(this)} 
                  onSortOrder={this._changeSortOrder.bind(this)} />
                  
                <ReposList repos={sortedRepos} />
							</div>
						)
						: <p>{this.props.user} doesn’t have any public repositories yet.</p>
				}
			</div>
		)
	}

}

export default Profile;
