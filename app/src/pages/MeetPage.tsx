import Features from "@components/Features.tsx";
import Meeting from "@components/Meeting.tsx";

const MeetPage = () => {
	return (
		<main className="w-full min-h-screen flex flex-col items-center justify-center py-28">
			<span className="w-3/4">
				<h1 className="text-6xl text-balance font-medium text-center">
					Get started with{" "}
					<span className="font-semibold underline decoration-wavy decoration-green-400">
						Hosting
					</span>{" "}
					or{" "}
					<span className="font-semibold underline decoration-wavy decoration-green-400">
						Joining
					</span>{" "}
					a Meeting.
				</h1>
			</span>
			<section className="w-3/4 min-h-[60dvh] flex items-center justify-center gap-8 py-16">
				<Meeting />
			</section>
			<Features />
		</main>
	);
};

export default MeetPage;
