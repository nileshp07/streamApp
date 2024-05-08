import { cva } from "class-variance-authority";
import { Link as ReactLink } from "react-router-dom";

type LinkProps = {
	variant: "primary" | "secondary" | "logo" | "nav";
	to: string;
	children: React.ReactNode;
};

const Link = ({ variant, ...props }: LinkProps) => {
	return (
		<ReactLink to={props.to} className={linkVariants({ variant })}>
			{props.children}
		</ReactLink>
	);
};

const linkVariants = cva("w-fit transition-colors duration-300", {
	variants: {
		variant: {
			primary: "border-b-4 border-transparent hover:border-green-400",
			secondary:
				"border-b-4 text-green-400 border-transparent hover:border-black",
			logo: "text-4xl font-medium",
			nav: "text-2xl font-medium",
		},
	},
	defaultVariants: {
		variant: "primary",
	},
});

export default Link;
