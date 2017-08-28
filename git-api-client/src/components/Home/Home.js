import { h, Component } from 'preact';
import { route } from 'preact-router';
import linkState from 'linkstate';
import { PATH } from '../../path/path';

export class Home extends Component {
	getRepos(e) {
    e.preventDefault();

    let routePath = PATH.length > 1 ? PATH : '';
    
		route(`${routePath}/${encodeURIComponent(this.state.query)}`);
	}

	render() {
		return (
			<form onSubmit={this.getRepos.bind(this)}>
				<input type="text" onInput={linkState(this, 'query')} placeholder="e.g. Kottans"/>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

export default Home;
