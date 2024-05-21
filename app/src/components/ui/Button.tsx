import {cva} from 'class-variance-authority';
import {ButtonHTMLAttributes} from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant: 'primary' | 'secondary';
	// onClick: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({variant, ...props}: ButtonProps) => {
	return <button {...props} className={buttonVariants({variant})} />;
};

const buttonVariants = cva('w-full px-8 py-4 font-medium rounded-xl transition-colors', {
	variants: {
		variant: {
			primary: 'bg-black text-green-400',
			secondary: 'text-green-800 bg-green-400',
		},
	},
	defaultVariants: {
		variant: 'primary',
	},
});

export default Button;
