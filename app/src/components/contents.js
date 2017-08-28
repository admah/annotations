import React, { Component } from 'react';

class Contents extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div className="contents">
				{ this.props.content }

				{ this.props.annotations }
			</div>
		);
	}
  }
  
  export default Contents;