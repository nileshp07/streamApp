import Button from "@components/ui/Button.tsx";
import Input from "@ui/Input.tsx";

type MeetingFormProps = {
	tab: number;
	handleClick: () => void;
};

const MeetingForm = ({ tab, handleClick }: MeetingFormProps) => {
	return (
		<form className="flex flex-col gap-2 items-center justify-center p-12 rounded-2xl shadow-2xl w-1/2 min-h-[50dvh]">
			<span className="flex flex-col gap-2 items-center my-6">
				<h1 className="text-4xl font-medium">
					<span>{tab === 0 ? "Host" : "Join"}</span> a Meeting
				</h1>
				<p className="text-lg font-light text-center text-balance">
					{tab === 0
						? "People can Join your meeting using the Room name."
						: "You can Join a Room by entering the Room name."}
				</p>
			</span>
			<Input
				variant="primary"
				type="text"
				name="roomName"
				placeholder="Enter Room name"
				required
			/>
			<Button
				onClick={() => handleClick()}
				variant={tab === 0 ? "primary" : "secondary"}
			>
				{tab === 0 ? "Host" : "Join"}
			</Button>
		</form>
	);
};

export default MeetingForm;
