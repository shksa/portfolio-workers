import { Link, NavLink } from "remix";
import dpImgSrc from "../../public/images/dp_icon.jpg";

const PageLink = ({ text, to }: { text: string; to: string }) => {
	return (
		<NavLink prefetch="intent" to={to}>
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
			<header
				className="py-3 md:py-5 fixed-mobile-compat top-0 left-0 z-10 w-full bg-white/40 backdrop-blur-md backdrop-saturate-150 shadow-lg shadow-grey-500/50"
			>
				<nav className="px-4 container mx-auto lg:max-w-3xl text-lg font-bold text-black">
					<ol className="space-x-6 sm:space-x-8 md:space-x-12 lg:space-x-16 flex items-center">
						<Link prefetch="intent" to="." className="h-12 w-12">
							<img
								alt="Sreekar Numbalkar"
								src={dpImgSrc}
								className="rounded-full ring-2 ring-blue-500 ring-offset-2 ring-offset-blue-100"
							></img>
						</Link>
						<li>
							<PageLink to="." text="Home" />
						</li>
						<li>
							<PageLink to="blog" text="Blog" />
						</li>
						<li>
							<PageLink to="about" text="About" />
						</li>
					</ol>
				</nav>
			</header>
			<div className="h-[72px] md:h-[88px] mb-8 sm:mb-20"></div>
		</>
	);
};
