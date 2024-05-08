import Button from "@ui/Button.tsx";
import Link from "./ui/Link.tsx";

const Hero = () => {
	return (
		<section className="w-full py-28 flex flex-col gap-4 items-center justify-center">
			<h1 className="text-6xl font-medium">
				Meeting's made{" "}
				<span className="underline decoration-green-400 decoration-wavy font-semibold">
					Super
				</span>{" "}
				Easy..!
			</h1>
			<p className="text-3xl text-pretty text-center font-light w-1/2 mt-4">
				You're one stop solution for handling online meetings.
			</p>
			<span className="w-fit">
				<Link variant="primary" to="/meet">
					<Button variant="primary">Get Started</Button>
				</Link>
			</span>
			<div className="w-5/6 min-h-[80dvh] bg-neutral-300 rounded-2xl mt-8 shadow-2xl"></div>
		</section>
	);
};

export default Hero;
