import Button from '@ui/Button.tsx';
import Input from '@ui/Input.tsx';
import Link from '@ui/Link.tsx';
import axios from 'axios';
import {useState} from 'react';
import {Toaster, toast} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';

const RegisterForm = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const [err, setErr] = useState<boolean>(false);

	const navigate = useNavigate();

	async function handleSignup(e: {preventDefault: () => void}) {
		e.preventDefault();
		await axios
			.post('http://localhost:3000/auth/register', {
				firstName,
				lastName,
				email,
				password,
			})
			.then((response) => {
				console.log(response);
				setTimeout(function () {
					localStorage.setItem('accessToken', response.data.token);
					navigate('/meet');
				}, 2000);
				toast.success(response.data.message);
			})
			.catch((error) => {
				console.log(error.response);
				console.log(error.response.data.message);
				setErr(true);
				toast.error(error.response.data?.error?.issues[0]?.message || error.response.data.message);
			});
	}

	return (
		<>
			{err && <Toaster position='top-center' reverseOrder={false} />}

			<form onSubmit={handleSignup} className='flex flex-col gap-2 items-center justify-center p-12 rounded-2xl shadow-2xl '>
				<Link to='/' variant='logo'>
					Duo M<span className='text-green-400'>ee</span>t.
				</Link>
				<div className='flex gap-4'>
					<Input variant='primary' value={firstName} type='text' name='name' placeholder='First name' required onChange={(e) => setFirstName(e.target.value)} />
					<Input variant='primary' value={lastName} type='text' name='name' placeholder='Last name' required onChange={(e) => setLastName(e.target.value)} />
				</div>
				<Input variant='primary' value={email} type='email' name='email' placeholder='example@gmail.com' required onChange={(e) => setEmail(e.target.value)} />
				<Input
					variant='primary'
					value={password}
					type={`${showPassword ? 'text' : 'password'}`}
					name='password'
					placeholder='Password'
					required
					onChange={(e) => setPassword(e.target.value)}
				/>
				<div className='w-full flex items-center justify-between text-sm'>
					<Link to='/register' variant='primary'>
						Forgot Password?
					</Link>
					<span onClick={() => setShowPassword(!showPassword)} className='cursor-pointer'>
						{showPassword ? 'Hide' : 'Show'}
					</span>
				</div>
				<Button variant='secondary' type='submit'>
					Sign Up
				</Button>

				<span className='text-sm w-full'>
					Already have an account?
					<Link to='/login' variant='secondary'>
						Login
					</Link>
				</span>
			</form>
		</>
	);
};

export default RegisterForm;
