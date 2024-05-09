import Room from "@components/Room.tsx";
import { useParams } from "react-router-dom";

const RoomPage = () => {
	const params = useParams();
	const roomId = params.roomId;

	return (
		<main className="w-full min-h-screen flex flex-col items-start justify-center">
			<Room />
		</main>
	);
};

export default RoomPage;
