import { h, Component } from 'preact';
import Modal from '../Modal/Modal';

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
      <div onClick={this._toggleModal.bind(this)}>
        <p>Name: {name}</p>
        <p>Description: {description}</p>
        <p>Forked: {fork.toString()}</p>
        <p>Stars: {stargazers_count}</p>
        <p>Updated: {pushed_at}</p>
        <p>Language: {language}</p>
        <br />
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
