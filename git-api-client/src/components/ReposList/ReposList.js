import { h } from 'preact';
import Repo from '../Repo/Repo';
import './ReposList.css';

export default function ReposList ( { repos } ) {
	return (
        <ul class='repos-list'>
          {repos.length > 0 
            ? repos.map(repo => <li class="repo"><Repo {...repo} key={repo.id} /></li>)
            : <p>Not a single repo met filter criteria</p>
          }
		    </ul>
	)
}
