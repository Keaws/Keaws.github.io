import { h, Component } from 'preact';
import Repo from '../Repo/Repo';
import API from '../../api/api';

export class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			repos: null,
			loading: true
		}
	}

	componentDidMount() {
		API.getRepos(this.props.user)
			.then(res => res.json())
			.then(repos => {
				this.setState({
					repos,
					loading: false
				})
			})
			.catch(err => console.error(err));
	}

	render({}, {loading, repos}) {
		return (
			<div>
				{loading
					? <p>Fetching...</p>
          : repos.length > 0
              ? repos.map(repo => <Repo {...repo} />) 
              : <p>{this.props.user} doesn’t have any public repositories yet.</p>
				}
			</div>
		)
	}

}

export default Profile;
