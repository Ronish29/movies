import React from 'react'
import './MovieCard.css'

const MovieCard = (props) => {

    const {
        movietitle,
        imdbmovieid,
        movielanguages,
        moviecountries,
        moviemainphotos,
        moviegenres
    } = props;

    return (
        <div className='relative'>
            
            <div className='flex flex-col px-8 py-6 gap-y-5 items-center border border-gray-200 cursor-pointer  rounded-lg shadow md:flex-row  hover:bg-gray-100 '>
                <div className='min-w-[250px] '>
                    <img src={moviemainphotos} alt=""
                        className='object-cover  w-full rounded-lg h-96 md:h-auto md:w-48  md:rounded-lg movieImage' />
                </div>
                <div className='flex w-full flex-col gap-y-3 lg:items-start md:items-start sm:items-start'>
                    <div className='title'>
                        <span className='font-medium text-2xl'> Movie Title:</span><h1 className='text-3xl font-bold'>{movietitle}</h1>
                    </div>

                    <div className='inline-flex items-baseline gap-x-2'>
                        <span className='text-lg font-medium min-w-fit'> Imdb Id:</span>
                        <h3 className='text-md font-normal'> {imdbmovieid}</h3>
                    </div>

                    <div className='languages'>
                        <span className='text-lg font-medium min-w-fit'> Languages: </span>
                        <p className='text-md font-normal'>  {movielanguages.join(', ')}</p>

                    </div>

                    <div className='countries'>
                        <span className='text-lg font-medium min-w-fit'> Movie countries: </span>
                        <p className='text-md font-normal'>  {moviecountries.join(', ')}</p>
                    </div>

                    <div className='geners'>
                        <span className='text-lg font-medium'> Movie Geners: </span>
                        <p className='text-md font-normal'>  {moviegenres.join(', ')}</p>

                    </div>


                </div>


            </div>

        </div>

    )
}

export default MovieCard