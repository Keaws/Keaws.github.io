import { h, Component } from 'preact';
import Repo from '../Repo/Repo';
import API from '../../api/api';
import { FILTER_TYPE, Filters } from '../Filters/Filters';
import ReposList from '../ReposList/ReposList';

export class Profile extends Component {
	constructor(props) {
    super(props);
    
    const defaultFilters = {};
    defaultFilters[FILTER_TYPE.HAS_OPEN_ISSUES] = false;
    defaultFilters[FILTER_TYPE.HAS_TOPICS] = false;
    defaultFilters[FILTER_TYPE.STARRED_TIMES] = 0;
    defaultFilters[FILTER_TYPE.UPDATED_AFTER] = null;
    defaultFilters[FILTER_TYPE.REPO_TYPE] = null;
    defaultFilters[FILTER_TYPE.LANGUAGE] = null;

		this.state = {
			repos: null,
      loading: true,
      filters: defaultFilters,
      languages: [],
      sorting: {
        by: 'name', //TODO: Extract to soring types module
        order: 'desc'
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
          languages: [...new Set(repos.map(r => r.language).filter(l => l))]
        });
        console.log(repos);
			})
			.catch(err => console.error(err));
  }
  
  _changeFilter(type, state) {
    this.setState({
      filters: { ...this.state.filters, [type]: state }
    });

    console.log(this.state.filters);
  }

  _getFilteredRepos ( { HAS_OPEN_ISSUES, HAS_TOPICS, STARRED_TIMES, UPDATED_AFTER, REPO_TYPE, LANGUAGE}) {
    return this.state.repos.filter(repo => {
      return (HAS_OPEN_ISSUES ? !!repo.open_issues_count : true)
        && (HAS_TOPICS ? !!repo.topics.length : true)
        && repo.stargazers_count >= STARRED_TIMES
        && (UPDATED_AFTER ? new Date(repo.pushed_at) > new Date(UPDATED_AFTER) : true)
        && (REPO_TYPE && REPO_TYPE !== 'All' ? (REPO_TYPE === 'Fork' ? repo.fork : !repo.fork) : true)
        && (LANGUAGE && LANGUAGE !== 'All' ? repo.language === LANGUAGE : true)
    });
  }

	render({}, {loading, repos, filters, languages}) {
    const filteredRepos = repos && this._getFilteredRepos(filters);

		return (
			<div>
				{loading
					? <p>Fetching...</p>
        			: repos.length > 0
						? (
							<div>
								<Filters languages={languages} filters={filters} onFilter={this._changeFilter.bind(this)} />
								<ReposList repos={filteredRepos} />
							</div>
						)
						: <p>{this.props.user} doesn’t have any public repositories yet.</p>
				}
			</div>
		)
	}

}

export default Profile;
