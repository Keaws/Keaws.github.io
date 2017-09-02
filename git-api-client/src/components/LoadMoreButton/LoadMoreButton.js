import { h } from 'preact';
import './LoadMoreButton.css';

export default function LoadMoreButton ( { shouldDisplayLoadMore } ) {
	return (
    <button 
      class={!shouldDisplayLoadMore && 'hidden'}
      onClick={(e) => this.props.onLoadMore()}
      type="button"
      name="Load More"
      value="Load More">
      Load More
    </button>
	)
}
