import { useEffect, useState } from "react";
import Movies from "./components/movies.component";
import Navbar from "./components/navbar.component";
import getGenres from "./service/get-genres.service";

var searchValue = "";
function App() {
	const [genres, setGenres] = useState([]);
	const [selectedGenre, setSelectedGenre] = useState("All Genres");

	useEffect(() => {
		const genres = ["All Genres", ...getGenres()];
		setGenres(genres);
	}, []);

	const handleSearch = (event) => {
		searchValue = event.target.value;
	};

	const handleEnter = (event) => {
		if (event.key === "Enter") {
          
			if (searchValue.length > 1) {
				setSelectedGenre(searchValue);
				event.target.value = "";
			}
		}
	};

	const handleClickFilter = (selectedGenre) => {
		setSelectedGenre(selectedGenre);
	};

	return (
		<>
			<Navbar
				handleEnter={handleEnter}
				handleSearch={handleSearch}
			></Navbar>

			<Movies
				genres={genres}
				selectedGenre={selectedGenre}
				handleClickFilter={handleClickFilter}
			></Movies>
		</>
	);
}

export default App;
