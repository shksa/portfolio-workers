import {
	Links,
	LinksFunction,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import styles from "./tailwind.css";
import { Header } from "~/components/Header";

export const meta: MetaFunction = () => {
	return { title: "Sreekar Nimbalkar" };
};

export const links: LinksFunction = () => {
	return [
    { rel: "stylesheet", href: styles },
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
	];
};

export default function App() {
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
				<main className="prose md:prose-lg">
					<Outlet />
				</main>
				<ScrollRestoration />
				<Scripts />
				{process.env.NODE_ENV === "development" && <LiveReload />}
			</body>
		</html>
	);
}
