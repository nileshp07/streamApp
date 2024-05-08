import { cva } from "class-variance-authority";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	variant: "primary" | "secondary";
};
const Input = ({ variant, ...props }: InputProps) => {
	return <input {...props} className={inputVariants({ variant })} />;
};

const inputVariants = cva("w-full p-4 font-medium rounded-xl", {
	variants: {
		variant: {
			primary: "outline-black",
			secondary: "outline-green-400 text-green-400",
		},
	},
	defaultVariants: {
		variant: "primary",
	},
});

export default Input;
