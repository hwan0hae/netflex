import axios from "axios";

const API_KEY = "11b8fc2ffc22d905e1e220763fd1bcb2";
const BASE_PATH = "https://api.themoviedb.org/3";

/** Program Data interface */
export interface IProgram {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  overview: string;
}

export interface IGetProgramResult {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IProgram[];
  total_pages: number;
  total_results: number;
}

export interface IGetMovies {
  playing_movie: IGetProgramResult;
  popular_movie: IGetProgramResult;
  topRated_movie: IGetProgramResult;
  upComing_movie: IGetProgramResult;
}

/** MovieDetail Data  */

interface IMovieGenres {
  id: number;
  name: string;
}

interface IMovieDetail {
  backdrop_path: string;
  poster_path: string;
  genres: IMovieGenres[];
  id: number;
  title?: string;
  overview: string;
  popularity: number;
  release_date?: string;
  runtime?: number;
  tagline: string;
  vote_average: number;
  vote_count: number;
}

/** SimilarMovies Data  */
interface ISimilarMovie {
  backdrop_path: string;
  poster_path: string;
  id: number;
  title?: string;
  release_date: string;
}

export interface IGetMovie {
  movie_detail: IMovieDetail;
  similar_movies: { results: ISimilarMovie[] };
}

/** TvShow Data  */
export interface IGetTvShow {
  popular_tv: IGetProgramResult;
  topRated_tv: IGetProgramResult;
  onTheAir_tv: IGetProgramResult;
}

interface ITvDetail extends IMovieDetail {
  name: string;
  seasons: {
    air_date: string;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  }[];
}

interface ISimilarTv extends ISimilarMovie {
  name: string;
}

export interface IgetTv {
  tv_detail: ITvDetail;
  similar_tvShow: { results: ISimilarTv[] };
}

export interface IGetSearchData {
  search_movies: IGetProgramResult;
  search_tvShow: IGetProgramResult;
}

/** getMovies */
export async function getMovies() {
  const movies = <IGetMovies>{};
  const playingMoives = await fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
  ).then((response) => response.json());
  movies.playing_movie = playingMoives;

  const popularMoives = await fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
  ).then((response) => response.json());
  movies.popular_movie = popularMoives;

  const topRated = await fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
  ).then((response) => response.json());
  movies.topRated_movie = topRated;

  const upComming = await fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
  ).then((response) => response.json());
  movies.upComing_movie = upComming;

  return movies;
}
/** getMovie */
export async function getMovie(id: number) {
  const movie = <IGetMovie>{};

  const movie_detail = await fetch(
    `${BASE_PATH}/movie/${id}?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
  movie.movie_detail = movie_detail;

  const similar_movie = await fetch(
    `${BASE_PATH}/movie/${id}/similar?api_key=${API_KEY}&language=ko-KR&page=1`
  ).then((response) => response.json());
  movie.similar_movies = similar_movie;

  return movie;
}

/** getTvShow */

export async function getTvShow() {
  const tvShow = <IGetTvShow>{};

  const popularTv = await fetch(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko-KR&page=1`
  ).then((response) => response.json());
  tvShow.popular_tv = popularTv;

  const topRatedTv = await fetch(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`
  ).then((response) => response.json());
  tvShow.topRated_tv = topRatedTv;

  const onTheAirTv = await fetch(
    `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko-KR&page=1`
  ).then((response) => response.json());
  tvShow.onTheAir_tv = onTheAirTv;

  return tvShow;
}
/** getTv */
export async function getTv(id: number) {
  const tv = <IgetTv>{};

  const tv_detail = await fetch(
    `${BASE_PATH}/tv/${id}?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
  tv.tv_detail = tv_detail;

  const similar_tv = await fetch(
    `${BASE_PATH}/tv/${id}/similar?api_key=${API_KEY}&language=ko-KR&page=1`
  ).then((response) => response.json());
  tv.similar_tvShow = similar_tv;

  return tv;
}

export async function getSearchData(text: string | null) {
  const searchData = <IGetSearchData>{};

  const searchMovies = await fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${text}&page=1&include_adult=true&region=kr`
  ).then((response) => response.json());
  searchData.search_movies = searchMovies;

  const searchTvShow = await fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&language=ko-KR&query=${text}&page=1&include_adult=true&region=kr`
  ).then((response) => response.json());
  searchData.search_tvShow = searchTvShow;

  return searchData;
}

// export async function getMovies() {
//   return await axios(
//     `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
//   );
// }
