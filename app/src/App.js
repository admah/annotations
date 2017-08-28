import React, { Component } from 'react';
import axios from 'axios';
import './assets/css/annotation_app.css';
import Contents from './components/contents.js';
import ContentsList from './components/contents-list.js';

class App extends Component {
  constructor() {
    super();

    this.annotations = axios.get('http://localhost:3000/data/ch08.txt.xml', [{responseType: 'text'}])
    .then(function(response) {
      return response.data;
    });

    this.state = {
      currentChapter: 8,
      content: null,
      annotations: null,
      categories: ['PERSON', 'LOCATION', 'ORGANIZATION'],
      annotationsSaved: false
    }

    this.getContent = this.getContent.bind(this);
    this.sanitizeChapter = this.sanitizeChapter.bind(this);
  };

  componentDidMount() {
    //get content
    axios.get('http://localhost:3000/data/ch08.txt', [{responseType: 'text'}])
    .then(res => this.setState({ content: res.data }))
    .catch(err => console.log(err));

    //get annotations
    axios.get('http://localhost:3000/data/ch08.txt.xml', [{responseType: 'text'}])
    .then(res => this.setState({ annotations: res.data }))
    .catch(err => console.log(err));
	}

  getContent(chapter) {
    let contentChapter = chapter;
    const contentRequest = new Request('../assets/data/ch'+ contentChapter +'.txt', {
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    });

    fetch(contentRequest).then(function(response) {
      return response.text();
    });
  }

  sanitizeChapter(chapter) {
		if(chapter.toString().length = 1) {
			return '0' + chapter;
		} else {
      return chapter;
    }
	}

  render() {
    return (
      <div id="app-container" className="annotations-app container">
        <ContentsList categories={this.state.categories}></ContentsList>
        <Contents annotations={this.state.annotations} content={this.state.content}></Contents>
      </div>
    );
  }
}

export default App;
