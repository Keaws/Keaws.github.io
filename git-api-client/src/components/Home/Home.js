import { h, Component } from 'preact';
import { route } from 'preact-router';
import linkState from 'linkstate';

export class Home extends Component {
	getRepos(e) {
		e.preventDefault();

		route(`/${encodeURIComponent(this.state.query)}`);
	}

	render() {
		return (
			<div>
				<form onSubmit={this.getRepos.bind(this)}>
					<input type="text" onInput={linkState(this, 'query')} placeholder="e.g. Kottans"/>
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default Home;
