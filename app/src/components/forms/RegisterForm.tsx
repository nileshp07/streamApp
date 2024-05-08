import Button from "@ui/Button.tsx";
import Input from "@ui/Input.tsx";
import Link from "@ui/Link.tsx";
import { useState } from "react";

const RegisterForm = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const [fullName, setFullName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return (
		<form
			method="POST"
			className="flex flex-col gap-2 items-center justify-center p-12 rounded-2xl shadow-2xl w-1/3 min-h-[60dvh]"
		>
			<Link to="/" variant="logo">
				Duo M<span className="text-green-400">ee</span>t.
			</Link>
			<Input
				variant="primary"
				type="text"
				name="name"
				placeholder="Full name"
				required
				onChange={(e) => setFullName(e.target.value)}
			/>
			<Input
				variant="primary"
				type="email"
				name="email"
				placeholder="example@gmail.com"
				required
				onChange={(e) => setEmail(e.target.value)}
			/>
			<Input
				variant="primary"
				type={`${showPassword ? "text" : "password"}`}
				name="password"
				placeholder="Password"
				required
				onChange={(e) => setPassword(e.target.value)}
			/>
			<div className="w-full flex items-center justify-between text-sm">
				<Link to="/register" variant="primary">
					Forgot Password?
				</Link>
				<span
					onClick={() => setShowPassword(!showPassword)}
					className="cursor-pointer"
				>
					{showPassword ? "Hide" : "Show"}
				</span>
			</div>
			<Button variant="secondary" type="submit">
				Sign Up
			</Button>
			<span className="text-sm w-full">
				Already have an account?{" "}
				<Link to="/login" variant="secondary">
					Login
				</Link>
			</span>
		</form>
	);
};

export default RegisterForm;
