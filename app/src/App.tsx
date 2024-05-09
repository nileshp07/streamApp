import Footer from "@components/Footer.tsx";
import Navbar from "@components/Navbar.tsx";
import HomePage from "@pages/HomePage.tsx";
import LoginPage from "@pages/LoginPage.tsx";
import MeetPage from "@pages/MeetPage.tsx";
import RegisterPage from "@pages/RegisterPage.tsx";
import RoomPage from "@pages/RoomPage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<main className="container font-poppins scroll-smooth">
				<Navbar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/meet" element={<MeetPage />} />
					<Route path="/room/:roomId" element={<RoomPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/login" element={<LoginPage />} />
				</Routes>
				<Footer />
			</main>
		</BrowserRouter>
	);
}

export default App;
