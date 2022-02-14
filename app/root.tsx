import {
	Links,
	LinksFunction,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLocation,
	useOutlet,
} from "remix";
import type { MetaFunction } from "remix";
import tailwindStyles from "./tailwind.css";
import { Header } from "~/components/Header";
import animationStyles from "animate.css";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { Location } from "history";
import { usePrevious } from "./lib/hooks";
import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";

export const meta: MetaFunction = () => {
	return { title: "Sreekar Nimbalkar" };
};

export const links: LinksFunction = () => {
	return [
		{ rel: "stylesheet", href: tailwindStyles },
		{
			rel: "preload",
			href: "/fonts/GTWalshiemPro/GTWalsheimPro-Regular.woff2",
			as: "font",
			type: "font/woff2",
		},
		{
			rel: "preload",
			href: "/fonts/GTWalshiemPro/GTWalsheimPro-Bold.woff2",
			as: "font",
			type: "font/woff2",
		},
		{
			rel: "preload",
			href: "/fonts/GTWalshiemPro/GTWalsheimPro-Medium.woff2",
			as: "font",
			type: "font/woff2",
		},
		{
			rel: "stylesheet",
			href: animationStyles,
		},
	];
};

const routesFromLeftToRightInHeader = ["/", "/blog", "/about"];

function getFadeDirections(
	currentLocation: Location,
	previousLocation: Location | undefined
): CSSTransitionClassNames {
	const idxOfCurrentRoute = routesFromLeftToRightInHeader.indexOf(
		currentLocation.pathname
	);
	const idxOfPreviousRoute =
		previousLocation &&
		routesFromLeftToRightInHeader.indexOf(previousLocation.pathname);
	if (
		idxOfPreviousRoute === undefined ||
		idxOfCurrentRoute > idxOfPreviousRoute ||
		idxOfCurrentRoute === idxOfPreviousRoute
	) {
		// happy path
		return {
			enterActive: "animate__fadeInRight",
			exitActive: "animate__fadeOutLeft",
		};
	}
	return {
		enterActive: "animate__fadeInLeft",
		exitActive: "animate__fadeOutRight",
	};
}

export default function App() {
	const outlet = useOutlet();
	const currentLocation = useLocation();
	const previousLocation = usePrevious(currentLocation);

	return (
		<html lang="en" className="font-gtWalshiemPro antialiased">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="px-4 container mx-auto lg:max-w-3xl">
				<Header />
				<SwitchTransition>
					<CSSTransition
						key={currentLocation.pathname}
						addEndListener={(node, done) =>
							node.addEventListener("animationend", done, false)
						}
						classNames={getFadeDirections(currentLocation, previousLocation)}
					>
						<main className="prose md:prose-lg animate__animated animate__faster">
							{outlet}
						</main>
					</CSSTransition>
				</SwitchTransition>
				<ScrollRestoration />
				<Scripts />
				{process.env.NODE_ENV === "development" && <LiveReload />}
			</body>
		</html>
	);
}
