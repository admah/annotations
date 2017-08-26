import React, { Component } from 'react';

class ContentsList extends Component {
	render() {
	  return (
		<div className="contents-list">
			<h4>Content List</h4>
			<button type="button" className="btn btn-link active">Chapter 8</button>

			<h4>Annotations</h4>
			<button className="btn btn-default active" type="button">Person</button>
			<button className="btn btn-default active" type="button">Location</button>
			<button className="btn btn-default active" type="button">Organization</button>
		</div>
	  );
	}
  }
  
  export default ContentsList;