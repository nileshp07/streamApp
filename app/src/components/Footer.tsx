import Link from "@ui/Link.tsx";

const Footer = () => {
	return (
		<footer className="w-full flex flex-col items-center gap-4 mt-12">
			<main className="w-full flex items-start justify-between gap-8">
				<section className="flex-[2] flex flex-col gap-4">
					<Link variant="logo" to="/">
						Duo M<span className="text-green-400">ee</span>t.
					</Link>
					<p className="w-4/5 text-pretty font-light">
						Connect instantly with Duo Meet your go-to for smooth, secure online
						meetings with just one click. No hassle, just seamless connection.
					</p>
				</section>
				<section className="flex-1 flex flex-col gap-2">
					<h1 className="text-lg font-medium">Useful links</h1>
					<Link to="/" variant="primary">
						Home
					</Link>
					<Link to="/meet" variant="primary">
						Host meeting
					</Link>
					<Link to="/meet" variant="primary">
						Join
					</Link>
					<Link to="/register" variant="primary">
						Sing up
					</Link>
				</section>
				<section className="flex-1 flex flex-col gap-2">
					<h1 className="text-lg font-medium">About Company</h1>
					<Link to="/" variant="primary">
						Terms & Conditions
					</Link>
					<Link to="/" variant="primary">
						Privacy Policy
					</Link>
					<Link to="/" variant="primary">
						FAQ's
					</Link>
					<Link to="/" variant="primary">
						support@duomeet.com
					</Link>
				</section>
			</main>
			<main className="w-full p-4 border-t text-center">
				<h1>© Duo Meet | All rights reserved - 2024</h1>
			</main>
		</footer>
	);
};

export default Footer;
