import Features from "@components/Features.tsx";
import Hero from "@components/Hero.tsx";

const HomePage = () => {
	return (
		<main className="w-full min-h-screen flex flex-col items-start justify-center">
			<Hero />
			<Features />
		</main>
	);
};

export default HomePage;
