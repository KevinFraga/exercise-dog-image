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

  render() {
    const { loading, imgList } = this.state;
    return (
      <div className="App">
        <button type="button" onClick={ this.fetchAPI }>New Pic</button>
        {loading ? <p>Loading...</p> : imgList.map((img) => <img src={ img } key={ img } alt="dog-pic" />)}
      </div>
    );
  }
}

export default App;
