import React, { Component } from 'react';

class Contents extends Component {
	render() {
		return (
			<div className="contents">
				{ this.props.content }
			</div>
		);
	}
  }
  
  export default Contents;