import React from "react";
import logo from "../images/imdb_logo.png";

const Navbar = ({ handleSearch, handleEnter }) => {
	return (
		<>
			<nav className="navbar navbar-light bg-dark">
				<a className="navbar-brand" href="/" style={{ color: "white" }}>
					<img
						style={{ marginLeft: "6px", width: "4rem" }}
						src={logo}
						alt="null"
					></img>{" "}
				</a>

				<span
					style={{
						marginTop: "18px",
						width: "92%",
						marginRight: "10px",
					}}
					className="input-group mb-3"
				>
					<div className="input-group-prepend">
						<span className="input-group-text">All</span>
					</div>
					<input
						type="text"
						onChange={handleSearch}
						onKeyDown={handleEnter}
						required
						className="form-control"
						placeholder="Search IMDb"
					/>
				</span>
			</nav>
		</>
	);
};

export default Navbar;
