import Axios from 'axios';
import React, {useState} from 'react';
import styled from 'styled-components';
import MovieComponent from './Components/MovieComponent';
import MovieInfoComponent from './Components/MovieInfoComponent';
export const API_KEY="c129fa0b";
const Container=styled.div`
  display:flex;
  flex-direction:column;
  `;
const Header=styled.div`
display:flex;
flex-direction:row;
background-color:black;
color:white;
padding:10px;
justify-content: space-between;
align-items: center;
 font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
  align-items:center;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;

function App() {
  const[searchQuery,updateSearchQuery]=useState();
  const[timeoutId,updateTimeoutId]=useState();
  const[movieList,updateMovieList]=useState([]);
  const[selectedMovie,onMovieSelect]=useState();

  const fetchData=async(searchString)=>{
    const res = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(res.data.Search);
    };
  
  const onTextChange=(event)=>{
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout=setTimeout(()=>fetchData(event.target.value),500);
    updateTimeoutId(timeout)

  };
  return (
    <Container>
      <Header>
      <AppName>Movie Library</AppName>
      <SearchBox>
      <SearchIcon src="/search-icon.svg"></SearchIcon>
      <SearchInput 
        placeholder="Search Movie" 
        value={searchQuery}
        onChange={onTextChange}

        />
      </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {
          movieList?.length?movieList.map((movie,index)=>
          <MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect}/>): "No Movie Found"
        }

      </MovieListContainer>
    </Container>
  );
}

export default App;
