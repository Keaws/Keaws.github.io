import { h } from 'preact';

export default function LoadMoreButton ( { shouldDisplayLoadMore } ) {
	return (
    <button 
      class={"btn " + (!shouldDisplayLoadMore && 'hidden')}
      onClick={(e) => this.props.onLoadMore()}
      type="button"
      name="Load More"
      value="Load More">
      Load More
    </button>
	)
}
