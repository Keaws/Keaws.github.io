import { h, Component } from 'preact';
import { route } from 'preact-router';
import { HOME_ROUTE } from '../../path/path';
import './Home.css';

export class Home extends Component {
	getRepos(e) {
    e.preventDefault();

    const form = new FormData(document.querySelector('.search-form'));
    const inputValue = form.get('query').trim();

    if (inputValue && /^\w*$/.test(inputValue)) {
      route(`${HOME_ROUTE}/${encodeURIComponent(inputValue)}`);      
    }
	}

	render() {
		return (
      <form
        class="search-form" 
        onSubmit={this.getRepos.bind(this)}>
        <fieldset>
          <legend>Enter Git Repository Name</legend>
          <input
            name="query"
            autofocus 
            class="query" 
            type="text" 
            placeholder="e.g. Kottans"/>

          <br />

          <button
            name="submit-button"
            class="btn"
            type="submit"
            value="I'm feeling lucky!">
            I'm feeling lucky!
          </button>
        </fieldset>
			</form>
		);
	}
}

export default Home;
