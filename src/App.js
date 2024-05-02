import { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import MovieCard from './components/MovieCard';



function App() {
  const [movies, setMovies] = useState([]);
  const animatedComponents = makeAnimated();
  const [searchTerm, setSearchTerm] = useState('');
  const [genreOptions, setGenreOptions] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  const url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/movies`);
        setMovies(response.data);

        const allGenres = Array.from(new Set(response.data.flatMap(movie => movie.moviegenres)));
        const allLanguages = Array.from(new Set(response.data.flatMap(movie => movie.movielanguages)));
        const allCountries = Array.from(new Set(response.data.flatMap(movie => movie.moviecountries)));

        const genreOptionsMapped = allGenres.map(genre => ({ value: genre, label: genre }));
        const languageOptionsMapped = allLanguages.map(language => ({ value: language, label: language }));
        const countryOptionsMapped = allCountries.map(country => ({ value: country, label: country }));

        setGenreOptions(genreOptionsMapped);
        setLanguageOptions(languageOptionsMapped);
        setCountryOptions(countryOptionsMapped);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [url]);

  const filterMovies = movie => {
    const matchesTitle = movie.movietitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenres = selectedGenres.length === 0 || selectedGenres.every(genre => movie.moviegenres.includes(genre.value));
    const matchesLanguages = selectedLanguages.length === 0 || selectedLanguages.every(language => movie.movielanguages.includes(language.value));
    const matchesCountries = selectedCountries.length === 0 || selectedCountries.every(country => movie.moviecountries.includes(country.value));

    return matchesTitle && matchesGenres && matchesLanguages && matchesCountries;
  };

  return (
    <div className='flex flex-col w-screen h-screen overflow-x-hidden '>
      <h1 className='text-4xl font-bold text-center mt-10 mb-10'>Movies</h1>
      <div className='filter-container sticky top-0 z-10 opacity-100'>
        <div className='flex justify-between gap-x-20 px-14 pb-4 mb-10 overflow-x-auto  bg-white'>
          <div className='flex gap-y-2 flex-col '>
            <label htmlFor="movieName" className='text-2xl'>Search By Movie Name:</label>
            <input className='border rounded-md outline-blue-200 w-[250px] pl-3 py-1.5' id='movieName' placeholder='abc' type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <div className='min-w-[250px] flex gap-y-2 flex-col '>
            <label htmlFor="genres" className='text-2xl'>Select Genre:</label>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={genreOptions}
              value={selectedGenres}
              onChange={setSelectedGenres}
              menuPortalTarget={document.body} 
              styles={{
                menuPortal: (provided, state) => ({
                  ...provided,
                  zIndex: 9999 
                })
              }}
            />
          </div>
          <div className='min-w-[250px] flex gap-y-2 flex-col '>
            <label htmlFor="languages" className='text-2xl'>Select Language:</label>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={languageOptions}
              value={selectedLanguages}
              onChange={setSelectedLanguages}
              menuPortalTarget={document.body} 
              styles={{
                menuPortal: (provided, state) => ({
                  ...provided,
                  zIndex: 9999 
                })
              }}
            />
          </div>
          <div className=' min-w-[250px] flex gap-y-2 flex-col '>
            <label htmlFor="countries" className='text-2xl'>Select Country:</label>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={countryOptions}
              value={selectedCountries}
              onChange={setSelectedCountries}
              menuPortalTarget={document.body} 
              styles={{
                menuPortal: (provided, state) => ({
                  ...provided,
                  zIndex: 9999 
                })
              }}
            />
          </div>
        </div>
      </div>


      {movies.filter(filterMovies).map((item, index) => (
        <div className='flex flex-col pb-10' key={index}>
          <MovieCard
            movietitle={item.movietitle}
            imdbmovieid={item.imdbmovieid}
            movielanguages={item.movielanguages}
            moviecountries={item.moviecountries}
            moviemainphotos={item.moviemainphotos}
            moviegenres={item.moviegenres}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
