import { ErrorBoundaryComponent, useCatch } from "remix";
import { Animate } from "./Animate";

export const CatchBoundary = () => {
	let caught = useCatch();

	let message;
	switch (caught.status) {
		case 401:
			message = <p>Oops! You don not have access to this page.</p>;
			break;
		case 404:
			message = <p>Oops! This page does not exist.</p>;
			break;

		default:
			throw new Error(caught.data || caught.statusText);
	}

	return (
		<div>
			<h1>
				{caught.status}: {caught.statusText}
			</h1>
			{message}
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
