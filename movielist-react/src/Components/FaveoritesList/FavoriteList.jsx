import styles from "./FavoritesList.module.css";

function FavoritesList({ favoriteMovies, goBack }) {
    return (
        <div className={styles.container}>
            <button onClick={goBack}>Back to Movies</button>
            <ul className={styles.movieList}>
                {favoriteMovies.map((movie, index) => (
                    <li key={index} className={styles.card}>
                        <img src={movie.image} alt={movie.title} className={styles.image} />
                        <div className={styles.cardContent}>
                            <span className={styles.movieTitle}>{movie.title}</span>
                            <div className={styles.details}>
                                <p>{movie.description}</p>
                                <p>Genre: {movie.genre}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FavoritesList;