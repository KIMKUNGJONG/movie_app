import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Movie from './Movie';
import { __await } from 'tslib';

class App extends Component {

  // render : componentWillMount() -> render() -> componentDidMount()

  /* update : componentWillRecieveProps() 새로운 prop받음 ->
              shouldComponentUpdate() == true 새로 받은 prop과 비교를 한뒤 old prop과 다르다면 ->
              componentWillUpdate() 컴포넌트는 업데이트를 실행 ->
              render() 랜더링 작업을 실행 ->
              componentDidUpdate() 컴포넌트 업데이트 결과 보여줌
  */
  // state : state가 바뀔때마다 다시 render() 된다. state선언은 컴포넌트를 로드하는 방법.
  state = {}
  componentDidMount(){
    /*
    setTimeout(() => {
      this.setState({
          // 기존의 리스트는 유지하고 그 뒤로 영화를 추가함. 삭제할경우 추가되는 영화만 보이게됨
          // 위치에따라 신규로 또는 이전으로 보이게 가능.
          // map-> {this.state.movies.map((movie, index) => {  return <Movie title={movie.title} poster={movie.poster} key={index} />  })}
          movies: [
            {
              title:"Avengers",
              poster:"https://am24.akamaized.net/tms/cnt/uploads/2018/09/avengers-4-promo-leak-1200x673.jpg"
            },
            {
              title:"SpiderMan",
              poster:"https://cnet1.cbsistatic.com/img/ZkRSkj-fvyazv_fdJYtHzjDzYZo=/2018/08/01/c915c669-30a3-494a-880b-bfc44d8c04e2/spider-man-ps4-preview-glass.jpg",
            },
            {
              title:"Hulk",
              poster:"https://media.wired.com/photos/59b83283b412f33ba9daa3f5/master/pass/thehulk-FA.jpg",
            },
            {
              title:"Thor",
              poster:"http://digitalspyuk.cdnds.net/18/09/640x347/gallery-1519729389-thor-ragnarok-reviews-big.jpg",
            },
            {
              title:"IronMan",
              poster:"https://cdn.britannica.com/s:500x350/26/187026-049-BC380C8A.jpg"
            },
            {
              title:"Captain America",
              poster:"https://image.ytn.co.kr/general/jpg/2018/0323/201803231620064718_d.jpg"
            }
          ]
      })
    },2000) */
    this._getMovies()
  }
  _renderMovies = () => { //기본 펑션과 내 제작 펑션의 구분을 위해 _를 붙여 만든다.
    const movies = this.state.movies.map(movie => {
      return <Movie 
        title={movie.title_english}
        poster={movie.medium_cover_image}
        key={movie.id}
        genres={movie.genres}
        synopsis={movie.synopsis}
      />  
    })
    return movies
  }
  _getMovies = async () => {
    const movies = await this._callApi() //callApi의 return value를 movies 변수에 적용한다.
    this.setState({
      movies
    })
  }
  _callApi = () => {
    return fetch('http://cors.io/?https://yts.am/api/v2/list_movies.json?sort_by=download_count')
    .then(response => response.json())//then은 fetch의 결과물을 오직 한개의 attr로 받아온다.
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }
  render() {
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {this.state.movies ? this._renderMovies() : 'Loading'}
      </div>
    );
  }
}

export default App;
