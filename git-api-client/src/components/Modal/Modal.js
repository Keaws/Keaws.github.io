import { h, Component } from 'preact';
import API from '../../api/api';
import './Modal.css';

export class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  _mounted = false;
  
  componentDidMount() {
      this._mounted = true;
  }

  shouldComponentUpdate() {
    if (!this.props.shouldShowModal) {
      return false;
    }

    this._mounted = true;
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.shouldShowModal !== nextProps.shouldShowModal && this._mounted) {
      const { repo } = this.props;
      const fullName = repo.full_name;
  
      repo.fork && await this._getSourceRepoInfo(fullName);
      await this._getContributors(fullName);
      await this._getLanguages(fullName);
      await this._getPopularPullRequests(fullName);
  
      await this.setStateAsync({
        loading: false
      });
    }
  }

  async _getSourceRepoInfo(fullName) {
    const repoInfoReq = await API.getRepoInfo(fullName);
    const repoInfo = await repoInfoReq.json();

    await this.setStateAsync({
      source_url: repoInfo.source.html_url,
      source_full_name: repoInfo.source.full_name
    });
  }

  async _getContributors(fullName) {
    const contributorsReq = await API.getRepoContributors(fullName);
    const contributors = await contributorsReq.json();

    await this.setStateAsync({
      contributors: contributors.slice(0, 3)
    });
  }

  async _getLanguages(fullName) {
    const languagesReq = await API.getRepoLanguages(fullName);
    const languages = await languagesReq.json();

    const moreThanOneKbLanguages = {};

    for (let lang in languages) {
      if (languages[lang] > 1024) {
        moreThanOneKbLanguages[lang] = this._formatBytes(languages[lang]);
      }
    }

    await this.setStateAsync({
      languages: moreThanOneKbLanguages
    });
  }

  async _getPopularPullRequests(fullName) {
    const popularPullRequestsReq = await API.getPopularPullRequests(fullName);
    const popularPullRequests = await popularPullRequestsReq.json();

    await this.setStateAsync({
      pullRequests: popularPullRequests
    });
  } 

  //https://stackoverflow.com/a/18650828
  _formatBytes(bytes, decimals) {
    if (bytes == 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
 }
 
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  render( 
    {shouldShowModal, repo}, 
    {loading, source_url, source_full_name, contributors, languages, pullRequests}) {

    if(!shouldShowModal) {
      return null;
    }

    return (
        <div class="backdrop"
          onClick={(e) => {this._mounted = false; this.props.onClose(e)}}>

          <div class="modal" onClick={(e) => e.stopPropagation()}>
            {loading
              ? <p>Fetching...</p>
              : <div>
                  <h1><a target="_blank" href={repo.html_url}>{repo.name}</a></h1>
                  {source_url && 
                    <h4 class="forked">Forked from <a target="_blank" href={source_url}>{source_full_name}</a></h4>}
  
                  <p>Top contributors</p>
                  {contributors.map(c => <ul>
                    <li>
                      <a target="_blank" href={c.html_url}>{c.login}</a> | {c.contributions}
                    </li>
                  </ul>)}

                  <p>Languages</p>
                  {
                    Object.keys(languages).map(lang => <ul>
                      <li>{lang} | {languages[lang]}</li>
                  </ul>)}

                  <p class={!pullRequests.length && 'hidden'}>Popular pull requests</p>
                  {pullRequests.length > 0 && pullRequests.map(pr => <ul>
                      <li>
                        <a target="_blank" href={pr.html_url}>{pr.title}</a>
                      </li>
                    </ul>)
                  }
                </div>
            }  
          </div>

        </div>
    );
  }
}

export default Modal;
