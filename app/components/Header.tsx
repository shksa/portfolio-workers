import classNames from "classnames";
import { NavLink } from "remix";

const Link = ({ text, to }: { text: string; to: string }) => {
	return (
		<NavLink to={to}>
			{({ isActive }) => (
				<span
					className={classNames({
						'underline': isActive,
					}, 'opacity-80 hover:opacity-100 font-semibold a')}
				>
					{text}
				</span>
			)}
		</NavLink>
	);
};

export const Header = () => {
	return (
		<header className="flex justify-between items-center py-9 px-6 lg:px-12 text-gray-900">
			<NavLink className="font-black text-3xl" to="/">Sreekar Nimbalkar</NavLink>
			<nav className="flex text-lg">
				<ol className="flex space-x-8">
					<li>
						<Link to="." text="Home" />
					</li>
					<li>
						<Link to="blog" text="Blog" />
					</li>
				</ol>
			</nav>
		</header>
	);
};
