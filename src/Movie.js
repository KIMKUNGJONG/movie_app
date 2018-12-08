import React from 'react'; //컴포넌트가 없으니 React, { Component } from 'react'; 에서 { Component }를 삭제한다.
import PropTypes from 'prop-types';
import LineEllipsis from 'react-lines-ellipsis'
import './Movie.css';
/*
class Movie extends Component{

    static propTypes = {
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired
    }//부모 prop에서 받아오는 정보 validate함.

    render(){
        
        return (
        <div>
            <MoviePoster poster={this.props.poster} />
            <h1>{this.props.title}</h1>
        </div>
        )
    }
}*/
function Movie({title, poster, genres, synopsis}){
    return (
        <div className="Movie">
            <div className="Movie__Columns">
                <MoviePoster poster={poster} alt={title} />
            </div>
            <div className="Movie__Columns">
                <h1>{title}</h1>
                <div className="Movie__Genres">
                    {genres.map((genre,index) => <MovieGenres genre={genre} key={index} /> )}
                </div>
                <p className="Movie__Synopsis">
                <LineEllipsis
                    text={synopsis}
                    maxLine='3'
                    ellipsis=' ...'
                    trimRight
                    basedOn='letters'
                />
                </p>
            </div>
        </div>
        )   
}
/* state가 있는 컴포넌트
class MoviePoster extends Component{ 
    //Movie에서 prop을 설정해주지 않으면 자식 컴포넌트인 MoviePoster에 Prop이 내려오지 않는다.
    //부모의 자식에 ~ 자식 이런식으로 점점 Prop이 내려오는걸 알수있음.

    static propTypes = {
        poster: PropTypes.string.isRequired
    }

    render(){
        return(
            <img src={this.props.poster} alt={this.props.title} />
        )
    }
}
*/
// 단순하게 return만을 위한 stateless 펑션. props만 받아서 리턴을 한다.
function MoviePoster({poster, alt}){
    return(
        <img src={poster} alt={alt} title={alt} className="Movie__Poster" />
    )
}
function MovieGenres({genre}){
    return(
        <span className="Movie__Genres">{genre}</span>
    )
}
Movie.propTypes = {
    title:PropTypes.string.isRequired,
    poster:PropTypes.string.isRequired,
    genres:PropTypes.array.isRequired,
    synopsis:PropTypes.string.isRequired
}
MoviePoster.propTypes = {
    poster : PropTypes.string.isRequired,
    alt : PropTypes.string.isRequired
}
MovieGenres.propTypes = {
    genre : PropTypes.string.isRequired
}

export default Movie