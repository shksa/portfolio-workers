import { ErrorBoundaryComponent, useCatch } from "remix";
import { Animate } from "./Animate";

export const CatchBoundary = () => {
	let caught = useCatch();
	
	let message;
	switch (caught.status) {
		case 401:
			message = "Oops! You don not have access to this page.";
			break;
		case 404:
			message = "Oops! This page does not exist.";
			break;

		default:
			throw new Error(caught.data || caught.statusText);
	}

	return (
		<div>
			<h1>{message}</h1>
			<h3>
				{caught.status}: {caught.data || caught.statusText}
			</h3>
		</div>
	);
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
	return (
		<div>
			<h1>
				Oops! This is an unexpected error...! Please navigate to some other page
			</h1>
			<p>
				{error.name} : {error.message}
			</p>
			<pre>{error.stack}</pre>
			<hr />
		</div>
	);
};
