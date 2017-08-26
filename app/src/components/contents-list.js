import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class ContentsList extends Component {
	render() {
	  return (
		<div className="contents-list">
			<h4>Content List</h4>
			<Button bsStyle="link" active>Chapter 8</Button>

			<h4>Annotations</h4>
			
			<Button bsStyle="primary" active>Person</Button>
			<Button bsStyle="primary" active>Location</Button>
			<Button bsStyle="primary" active>Organization</Button>
			
		</div>
	  );
	}
  }
  
  export default ContentsList;