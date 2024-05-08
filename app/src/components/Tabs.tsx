type TabsProps = {
	tab: number;
	setTab: (arg0: number) => void;
};

const Tabs = ({ tab, setTab }: TabsProps) => {
	return (
		<div className="w-1/2 flex items-center justify-between border-2 border-black p-4 rounded-xl relative">
			<span
				className={`w-1/2 h-full absolute top-0 left-0 transition-all duration-500 flex-1 p-1 z-10 flex items-center justify-center ${
					tab === 0 ? "" : "translate-x-full"
				}`}
			>
				<span
					className={`flex-1 h-full rounded-lg transition-colors duration-500 ${
						tab === 0 ? "bg-black" : "bg-green-400"
					}`}
				></span>
			</span>
			<span
				onClick={() => setTab(0)}
				className={`text-center text-lg font-medium flex-1 z-20 cursor-pointer ${
					tab == 0 && "text-green-400 mr-8"
				}`}
			>
				Host
			</span>
			<span
				onClick={() => setTab(1)}
				className={`text-center text-lg font-medium flex-1 z-20 cursor-pointer ${
					tab == 1 && "text-green-800 ml-8"
				}`}
			>
				Join
			</span>
		</div>
	);
};

export default Tabs;
