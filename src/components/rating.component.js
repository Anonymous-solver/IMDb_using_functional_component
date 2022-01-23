import React, { useState } from "react";
import Star from "./star.component";

const Rating = ({ handleToggleRating, rank, isRated }) => {
	return (
		<>
			<i
				onClick={() => handleToggleRating(rank)}
			>
				<Star isRated={isRated}></Star>
			</i>
		</>
	);
};

export default Rating;
