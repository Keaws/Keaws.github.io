import { h, Component } from 'preact';
import Modal from '../Modal/Modal';
import './Repo.css';
import Star from './Star.svg';
import Fork from './Fork.svg';

export class Repo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldShowModal: false
    }
  }

  _toggleModal (e) {
    e.stopPropagation();

    this.setState({
      shouldShowModal: !this.state.shouldShowModal
    });
  }
 
  render ({id, name, description, fork, stargazers_count, pushed_at, language}, {shouldShowModal}) {
    return (
      <div class="card">
        <header onClick={this._toggleModal.bind(this)}><h3>{name}</h3></header>

        <div class="card__container">
          <p>{description}</p>

          <div class="card__details">
            {fork && <span>
              <Fork />
            </span>}

            <span><Star /> {stargazers_count}</span>

            {language && <span>
              {language}
            </span>}

            <p>Updated on 
              <time datetime={pushed_at}>&nbsp;
                {new Date(pushed_at).toDateString()}
              </time>
            </p>
          </div>
        </div>

        <Modal
          shouldShowModal={shouldShowModal}
          repo={this.props}
          onClose={this._toggleModal.bind(this)}
        />
      </div>
    )
  }

}

export default Repo;
