import React, { useEffect, useState } from "react";
import Table from "./common/table.component";
import Rating from "./rating.component";
import getMovies from "../service/get-movies.service";
import _ from "lodash";
import Pagination from "./common/pagination.component";
import Filtering from "./common/filtering.component";

const Movies = ({ selectedGenre, handleClickFilter, genres }) => {
	const [movies, setMovies] = useState([]);
	const [cart, setCart] = useState([]);
	const [ratingCount, setRatingCount] = useState(0);

	const [sortColumn, setSortColumn] = useState({
		path: "rank",
		order: "asc",
	});

	const [activePage, setActivePage] = useState(1);
	const [pageCount, setPageCount] = useState(12);

	useEffect(() => {
		const movies = getMovies();
		setMovies(movies);
	}, []);

	const handleToggleRating = (movieRank) => {
		const movie = movies.find((movie) => movie.rank === movieRank);
		if (movie.your_rating === false) setRatingCount(ratingCount + 1);
		else setRatingCount(ratingCount - 1);
		movie.your_rating = !movie.your_rating;
		setMovies(movies);
	};

	const handleRemove = (key) => {
		const filteredMovies = movies.filter((movie) => movie.rank !== key);
		setMovies(filteredMovies);
	};

	const handleAdd = (key) => {
		const cartMovie = cart.find((movie) => movie.rank === key);
		if (cartMovie) return;
		const movie = movies.find((movie) => movie.rank === key);
		const newCart = [...cart, movie];
		setCart(newCart);
	};

	const handleDelete = (key) => {
		const newCart = cart.filter((movie) => movie.rank !== key);
		setCart(newCart);
	};

	const handleSort = (sortColumn) => {
		setSortColumn(sortColumn);
	};

	const handleClickPage = (activePage) => {
		setActivePage(activePage);
	};

	const paginateMovies = (movies) => {
		const start = (activePage - 1) * pageCount;
		const paginatedMovies = movies.slice(start, start + pageCount);
		return paginatedMovies;
	};

	const filterMovies = () => {
		const filteredMovies = movies.filter((movie) => {
			if (selectedGenre === "All Genres") return true;

			if (movie.genres.includes(selectedGenre)) return true;
			return false;
		});
		return filteredMovies;
	};

	const sortMovies = (movies) => {
		const sortedMovies = _.orderBy(
			movies,
			[sortColumn.path],
			[sortColumn.order]
		);
		return sortedMovies;
	};

	const filteredMovies = filterMovies();
	const paginatedMovies = paginateMovies(filteredMovies);
	const sortedMovies = sortMovies(paginatedMovies);
	const columns = [
		{
			label: "Image",
			path: "image",
			content: (movie, key) => (
				<td>
					{" "}
					<img
						style={{ width: "3rem" }}
						src={movie[key]}
						alt="null"
					/>
				</td>
			),
		},
		{
			label: "Rank",
			path: "rank",
			sorting: true,
			content: (movie, key) => <td> {movie[key]}</td>,
		},
		{
			label: "Title",
			path: "title",
			sorting: true,
			content: (movie, key) => (
				<td style={{ color: "#136CB2" }}> {movie[key]}</td>
			),
		},
		{
			label: "IMDb Rating",
			path: "imdb_rating",
			content: (movie, key) => (
				<td>
					{" "}
					<i className="fa fa-star" style={{ color: "gold" }}></i>
					{movie[key]}
				</td>
			),
		},
		{
			label: "Your Rating",
			path: "your_rating",
			content: (movie, key) => (
				<td>
					{" "}
					{
						<Rating
							isRated={movie[key]}
							rank={movie.rank}
							handleToggleRating={handleToggleRating}
						></Rating>
					}
				</td>
			),
		},
		{
			label: "Action",
			path: "action",
			content: (movie, key) => (
				<td>
					<button
						style={{
							borderRadius: "50%",
							border: "1px solid white",
						}}
						className="fa fa-trash-o"
						onClick={() => handleRemove(movie["rank"])}
					>
						{movie[key]}
					</button>{" "}
				</td>
			),
		},
		{
			label: "Add",
			path: "add",
			content: (movie, key) => (
				<td>
					{" "}
					<button
						style={{
							borderRadius: "50%",
							border: "1px solid white",
						}}
						className="fa fa-plus-circle"
						onClick={() => handleAdd(movie["rank"])}
					>
						{movie[key]}
					</button>{" "}
				</td>
			),
		},
	];

	return (
		<>
			{/* <h1>count: {this.state.ratingCount}</h1> */}
			<div style={{ display: "flex" }}>
				<div className="genres-container" style={{ width: "20%" }}>
					<Filtering
						items={genres}
						selectedGenre={selectedGenre}
						onClickFilter={handleClickFilter}
					></Filtering>
				</div>

				<div
					className="list-container"
					style={{
						width: "55%",
						marginLeft: "10px",
						marginRight: "10px",
						borderRight: "1px solid gray",
						paddingRight: "10px",
					}}
				>
					<Table
						items={sortedMovies}
						columns={columns}
						handleRemove={handleRemove}
						onSort={handleSort}
						sortColumn={sortColumn}
					></Table>

					<Pagination
						totalItems={filteredMovies.length}
						pageCount={pageCount}
						activePage={activePage}
						onClickPage={handleClickPage}
					></Pagination>
				</div>

				<div className="cart-container">
					<h5 style={{ marginLeft: "100px", color: "gray" }}>
						Watch List
					</h5>
					<hr />
					{cart.map((movie) => (
						<li style={{ color: "#136CB2" }}>
							{movie.title}{" "}
							<button
								style={{
									borderRadius: "50%",
									border: "1px solid white",
								}}
								onClick={() => handleDelete(movie["rank"])}
								className="fa fa-trash-o"
							></button>
							<br />
							<br />{" "}
						</li>
					))}
				</div>
			</div>
		</>
	);
};

export default Movies;
