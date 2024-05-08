const Features = () => {
	return (
		<main className="w-full flex flex-col gap-6 items-center justify-center">
			<h1 className="text-4xl font-medium underline decoration-wavy decoration-green-400">
				Features
			</h1>
			<section className="w-5/6 grid grid-cols-5 grid-rows-2 gap-6">
				<div className="bg-neutral-300 col-span-3 h-96 rounded-2xl hover:shadow-2xl transition-shadow duration-500"></div>
				<div className="bg-neutral-300 col-span-2 h-96 rounded-2xl hover:shadow-2xl transition-shadow duration-500"></div>
				<div className="bg-neutral-300 h-96 rounded-2xl hover:shadow-2xl transition-shadow duration-500"></div>
				<div className="bg-neutral-300 col-span-4 h-96 rounded-2xl hover:shadow-2xl transition-shadow duration-500"></div>
			</section>
		</main>
	);
};

export default Features;
