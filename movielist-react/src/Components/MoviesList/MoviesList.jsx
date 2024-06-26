import { useState } from 'react';
import styles from "./MoviesList.module.css"
import TopGunMaverickImage from './TopGunMaverick.jpg';
import CaptainPhillipsImage from './CaptainPhillips.jpeg';
import TheThomasCrownAffair from './TheThomasCrownAffair.jpeg';
import Armageddon from './Armageddon.jpeg'
import FavoritesList from '../FavoritesList/FavoritesList';


function MoviesList() {
    // initializing the list of movies with description, genre, and a picture 
    const initialMovies = [
        { 
            title: "Top Gun: Maverick", 
            description: 'Top Gun: Maverick is a 2022 American action drama film and sequel to the 1986 film Top Gun. It stars Tom Cruise as Pete "Maverick" Mitchell, a US Navy test pilot who leads a group of Top Gun graduates on a dangerous mission 30 years after the original film:.', 
            genre: "Drama", 
            image: TopGunMaverickImage
        },
        { 
            title: "Captain Phillips", 
            description: "Captain Phillips is a 2013 American biographical action-thriller film based on the true story of the 2009 hijacking of the U.S. cargo ship Maersk Alabama by Somali pirates. The film stars Tom Hanks as Captain Phillips, who is tasked with taking the ship on a dangerous route to Mombasa, Kenya. The film also explores the relationship between Phillips and the Somali pirate captain, Muse, and how Phillips appears to cooperate with the pirates to protect his crew. The film's final act is a rescue mission by the U.S. Navy and its SEAL teams to retrieve Phillips before the pirates reach Somalia.", 
            genre: "Action", 
            image: CaptainPhillipsImage
        },
        { 
            title: "The Thomas Crown Affair", 
            description: "The Thomas Crown Affair is a 1999 American romantic heist film starring Pierce Brosnan as Thomas Crown, a wealthy playboy who steals art for the challenge, and Rene Russo as Catherine Banning, an insurance investigator who's determined to catch him", 
            genre: "Drama", 
            image: TheThomasCrownAffair
        },
        { 
            title: "Armageddon", 
            description: "After discovering that an asteroid the size of Texas will impact Earth in less than a month, NASA recruits a misfit team of deep-core drillers to save the planet.", 
            genre: "Action", 
            image: Armageddon
        }
    ];

    const [movies, setMovies] = useState(initialMovies);
    const [showMovies, setShowMovies] = useState(true);
    const [detailsVisible, setDetailsVisible] = useState({});
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [viewFavorites, setViewFavorites] = useState(false);
    // This is part of a bonus 
    const [showOnlyAction, setShowOnlyAction] = useState(false);

    // toggle details, conditional rendering 
    function toggleDetails(index) {
        const newDetailsVisible = { ...detailsVisible };
        newDetailsVisible[index] = !newDetailsVisible[index];
        setDetailsVisible(newDetailsVisible);
    }

    // remove a movie but i don't think i can use if/else 
    // function removeMovie(index) {
    //     const newMovies = [];
    //     for (let i = 0; i < movies.length; i++) {
    //     if (i !== index) {
    //         newMovies.push(movies[i]);
    //     }
    //     }
    //     setMovies(newMovies);
    // }

    // remove a movie
    function removeMovie(index) {
        const newMovies = movies.filter((_, i) => i !== index);
        setMovies(newMovies);
    }

    // filter movies based on genre but again don't think i am supposed to use if/else 
    // let filteredMovies;
    // if (showOnlyAction) {
    //     filteredMovies = movies.filter(movie => movie.genre === "Action");
    // } else {
    //     filteredMovies = movies;
    // }

    // filter movies based on genre (Bonus)
    const filteredMovies = showOnlyAction
    ? movies.filter(movie => movie.genre === "Action")
    : movies;

    // favorite movies
    function toggleFavorite(index) {
        const movie = movies[index];
        const isFavorited = favoriteMovies.some((favMovie) => favMovie.title === movie.title);
        if (isFavorited) {
            const newFavorites = favoriteMovies.filter((favMovie) => favMovie.title !== movie.title);
            setFavoriteMovies(newFavorites);
        } else {
            setFavoriteMovies([...favoriteMovies, movie]);
        }
    }

    return (
        <div className={styles.container}>
            {viewFavorites ? (
                <FavoritesList favoriteMovies={favoriteMovies} goBack={() => setViewFavorites(false)} />
            ) : (
                <>
                    <button onClick={() => setShowMovies(!showMovies)}>
                        {showMovies ? "Hide Movies" : "Show Movies"}
                    </button>
                    <button onClick={() => setViewFavorites(true)}>View Favorites</button>
                    <button onClick={() => setShowOnlyAction(!showOnlyAction)}> 
                        {showOnlyAction ? "Show All Movies" : "Show Only Action Movies"}
                    </button>
                    {showMovies && (
                        <ul className={styles.movieList}>
                            {filteredMovies.map((movie, index) => (
                                <li key={index} className={styles.card}>
                                    <img src={movie.image} alt={movie.title} className={styles.image} />
                                    <div className={styles.cardContent}>
                                        <span className={styles.movieTitle}>{movie.title}</span>
                                        <button onClick={() => toggleDetails(index)}>Details</button>
                                        <button onClick={() => removeMovie(index)}>Remove</button>
                                        <div className={styles.checkboxContainer}>
                                            <input
                                                type="checkbox"
                                                checked={favoriteMovies.some((favMovie) => favMovie.title === movie.title)}
                                                onChange={() => toggleFavorite(index)}
                                                className={styles.checkbox}
                                            />
                                            <label className={styles.checkboxLabel}>Add to Favorites</label>
                                        </div>
                                                {detailsVisible[index] && (
                                                    <div className={styles.details}>
                                                        <p>{movie.description}</p>
                                                        <p>Genre: {movie.genre}</p>
                                                    </div>
                                            )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
}

export default MoviesList;