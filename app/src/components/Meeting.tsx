import MeetingForm from "@components/forms/MeetingForm.tsx";
import { useState } from "react";
import Tabs from "./Tabs.tsx";

const HostMeeting = () => {
	const [tab, setTab] = useState<number>(0);

	return (
		<main className="flex-1 flex flex-col gap-2 items-center justify-center">
			<Tabs tab={tab} setTab={setTab} />
			<MeetingForm tab={tab}/>
		</main>
	);
};

export default HostMeeting;
