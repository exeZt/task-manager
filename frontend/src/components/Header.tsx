const Header: () => React.JSX.Element = () => {
	return (
		<div className="app-header">
			<h1 className="app-title">Task Planner</h1>
			<p className="app-stats">
				<span id="active-count">3</span> active · <span id="completed-count">1</span> completed
			</p>
		</div>
	);
}

export default Header;