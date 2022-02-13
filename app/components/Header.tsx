import { NavLink } from "remix";
import dpImgSrc from "../../public/images/dp_icon.jpg";

const Link = ({ text, to }: { text: string; to: string }) => {
	return (
		<NavLink to={to}>
			{({ isActive }) => (
				<span
					className={
						isActive
							? "opacity-100 border-b-indigo-500 border-b-2 pb-1"
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
		<>
			<header className="py-3 md:py-5 fixed top-0 left-0 w-full bg-white/40 backdrop-blur-md shadow-lg shadow-grey-500/50">
				<nav className="px-4 container mx-auto lg:max-w-3xl text-lg font-bold text-black">
					<ol className="space-x-6 sm:space-x-8 md:space-x-12 lg:space-x-16 flex items-center">
						<NavLink to="/" className="h-12 w-12">
							<img
								alt="Sreekar Numbalkar"
								src={dpImgSrc}
								className="rounded-full ring-2 ring-blue-500 ring-offset-2 ring-offset-blue-100"
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
			<div className="h-[72px] md:h-[88px] mt-8 sm:mt-20"></div>
		</>
	);
};
