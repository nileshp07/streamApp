import Link from "@ui/Link.tsx";

const Navbar = () => {
	return (
		<nav className="flex items-center justify-between py-4">
			<Link variant="nav" to="/">
				Duo M<span className="text-green-400">ee</span>t.
			</Link>
			<div className="flex gap-8">
				<Link variant="primary" to="/meet">
					Get started
				</Link>
				<Link variant="primary" to="/register">
					Sign up
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
