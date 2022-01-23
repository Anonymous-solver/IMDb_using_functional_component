const Filtering = ({ items, selectedGenre, onClickFilter }) => {
	return (
		<div>
			<ul className="list-group">
				{items.map((item) => {
					return (
						<div key={item}>
							<li
								onClick={() => onClickFilter(item)}
								className={
									item === selectedGenre
										? "list-group-item active"
										: "list-group-item"
								}
							>
								{item}
							</li>
						</div>
					);
				})}
			</ul>
		</div>
	);
};

export default Filtering;
