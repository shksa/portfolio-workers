import {
	Links,
	LinksFunction,
	LiveReload,
	Meta,
	Scripts,
	ScrollRestoration,
	useOutlet,
	ErrorBoundaryComponent,
} from "remix";
import type { MetaFunction } from "remix";
import tailwindStyles from "./tailwind.css";
import { Header } from "~/components/Header";
import { ReactNode } from "react";
import { Animate } from "~/components/Animate";
import {ErrorBoundary as _ErrorBoundary, CatchBoundary as _CatchBoundary} from '~/components/ErrorAndCatchBoundry'

export const meta: MetaFunction = () => {
	return { title: "Sreekar Nimbalkar" };
};

export const links: LinksFunction = () => {
	return [
		{ rel: "stylesheet", href: tailwindStyles },
		{
			rel: "icon",
			type: "image/x-icon",
			href: "/favicon.ico",
		},
		{
			rel: "preload",
			href: "/fonts/GTWalshiemPro/GTWalsheimPro-Regular.woff2",
			as: "font",
			type: "font/woff2",
			crossOrigin: "anonymous",
		},
		{
			rel: "preload",
			href: "/fonts/GTWalshiemPro/GTWalsheimPro-Bold.woff2",
			as: "font",
			type: "font/woff2",
			crossOrigin: "anonymous",
		},
		{
			rel: "preload",
			href: "/fonts/GTWalshiemPro/GTWalsheimPro-Medium.woff2",
			as: "font",
			type: "font/woff2",
			crossOrigin: "anonymous",
		},
	];
};

export default function App() {
	const outlet = useOutlet();

	return (
		<Document>
			<Layout>
				{outlet}
			</Layout>
		</Document>
	);
}

const Document = ({ children }: { children: ReactNode }) => {
	return (
		<html lang="en" className="font-gtWalshiemPro antialiased">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="px-4 container mx-auto lg:max-w-3xl min-h-screen">
				{children}
				<ScrollRestoration />
				<Scripts />
				{process.env.NODE_ENV === "development" && <LiveReload />}
			</body>
		</html>
	);
};

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Header />
			{/* overflow-hidden on body does not prevent scrollbars, it has to be a new element here, hence the main element */}
			{/* NOTE: Find out what happning here as overflow-hidden is also supposed to work on Y-axis */}
			<main className="overflow-hidden prose md:prose-lg break-words">
				<Animate>
					{children}
				</Animate>
			</main>
		</>
	);
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
	return (
		<Document>
			<Layout>
				<_ErrorBoundary error={error} />
			</Layout>
		</Document>
	);
}

export const CatchBoundary = () => {
	return (
		<Document>
			<Layout>
				<_CatchBoundary />
			</Layout>
		</Document>
	);
}
