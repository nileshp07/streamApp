import { useEffect, useRef } from "react";

const Room = () => {
	const localStreamRef = useRef<HTMLVideoElement>(null);
	const remoteStreamRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({
				audio: true,
				video: { width: 1080, height: 1080 },
			})
			.then((mediaStream) => {
				if (
					localStreamRef.current !== null &&
					remoteStreamRef.current !== null
				) {
					localStreamRef.current.srcObject = mediaStream;
					remoteStreamRef.current.srcObject = mediaStream;
					localStreamRef.current.onloadedmetadata = () => {
						localStreamRef.current?.play();
					};

					remoteStreamRef.current.onloadedmetadata = () => {
						remoteStreamRef.current?.play();
					};
				}
			});
	});

	return (
		<main className="w-full min-h-[90dvh] grid grid-cols-4 grid-rows-3 gap-4">
			<div className="bg-neutral-300 rounded-2xl col-span-3 row-span-3 overflow-clip relative">
				<video ref={localStreamRef} className="object-cover "></video>
			</div>
			<div className="bg-neutral-300 rounded-2xl row-span-1 overflow-clip">
				<video ref={remoteStreamRef} className="object-cover"></video>
			</div>
			<div className="bg-neutral-300 rounded-2xl row-span-2"></div>
		</main>
	);
};

export default Room;
