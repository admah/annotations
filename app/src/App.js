import React, { Component } from 'react';
import axios from 'axios';
import './assets/css/annotation_app.css';
import Contents from './components/contents.js';
import ContentsList from './components/contents-list.js';

class App extends Component {
  constructor() {
    super();

    this.content = axios.get('http://localhost:3000/data/ch08.txt', [{responseType: 'text'}])
    .then(function(response) {
      console.log(response.data);
      return response.data;
    });

    this.annotations = axios.get('http://localhost:3000/data/ch08.txt.xml', [{responseType: 'text'}])
    .then(function(response) {
      return response.data;
    });

    this.state = {
      contentChapter: 8,
      content: this.content,
      annotations: this.annotations,
      categories: ['PERSON', 'LOCATION', 'ORGANIZATION'],
      annotationsSaved: false
    }

    this.getContent = this.getContent.bind(this);
    this.sanitizeChapter = this.sanitizeChapter.bind(this);
  };

  componentDidMount() {
    axios.get('http://localhost:3000/data/ch08.txt.xml')
    .then(function(response) {
      console.log(response.data);
    });
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
      <div className="annotations-app container">
        <ContentsList categories={this.state.categories}></ContentsList>
        <Contents content={this.state.content}></Contents>
      </div>
    );
  }
}

export default App;
