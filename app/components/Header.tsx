import classNames from "classnames";
import { NavLink } from "remix";
import dpImgSrc from "../../public/images/dp_icon.jpg";

const Link = ({ text, to }: { text: string; to: string }) => {
	return (
		<NavLink to={to}>
			{({ isActive }) => (
				<span
					className={
						isActive
							? "opacity-100 border-b-orange-400 border-b-2 pb-1"
							: "opacity-60 hover:opacity-100"
					}
				>
					{text}
				</span>
			)}
		</NavLink>
	);
};

export const Header = () => {
	return (
		<header className="py-3 md:py-5">
			<nav className="text-lg font-bold text-black">
				<ol className="space-x-6 sm:space-x-8 md:space-x-12 lg:space-x-16 flex items-center">
					<NavLink to="/" className="h-12 w-12">
						<img
							alt="Sreekar Numbalkar"
							src={dpImgSrc}
							className="rounded-full"
						></img>
					</NavLink>
					<li>
						<Link to="." text="Home" />
					</li>
					<li>
						<Link to="blog" text="Blog" />
					</li>
					<li>
						<Link to="about" text="About" />
					</li>
				</ol>
			</nav>
		</header>
	);
};
