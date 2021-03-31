import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgList: [],
      loading: false,
    }
    this.fetchAPI = this.fetchAPI.bind(this);
  }

  fetchAPI() {
    const api = 'https://dog.ceo/api/breeds/image/random';
    this.setState({ loading: true }, () => {
      fetch(api)
        .then(response => response.json())
        .then(({ message }) => {
          this.setState((previousState) => ({
            loading: false,
            imgList: [...previousState.imgList, message],
          }))
        });
    });
  }
  
  componentDidMount() {
    this.fetchAPI();
  }

  shouldComponentUpdate(_nextProps, nextState) {
    const { imgList } = nextState;
    if (imgList.length > 0) {
      if (imgList[imgList.length - 1].includes('terrier')) return false;
    }
    return true;
  }

  componentDidUpdate() {
    const { imgList, loading } = this.state;
    if (imgList.length > 0) {
      localStorage.setItem('dog-pic', imgList[imgList.length - 1]);
    }
    if (localStorage.length > 0 && loading === false) {
      const dogPic = localStorage.getItem('dog-pic');
      const breed = dogPic.slice(dogPic.indexOf('breeds/') + 7, dogPic.lastIndexOf('/'));
      alert(breed);
    }
  }

  render() {
    const { loading, imgList } = this.state;
    return (
      <div className="App">
        <div>
          <button type="button" onClick={ this.fetchAPI }>New Pic</button>
        </div>
        {loading ? <p>Loading...</p> : imgList.map((img) => <img src={ img } key={ img } alt="dog-pic" />)}
      </div>
    );
  }
}

export default App;
