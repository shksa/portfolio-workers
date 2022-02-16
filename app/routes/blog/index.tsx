import { ErrorBoundaryComponent, Link, LoaderFunction, useLoaderData, json, useCatch } from "remix";
import invariant from "tiny-invariant";
import { Text } from "~/components/Text";
import { getDatabase } from "~/lib/notion";

const isValidNotionDatabaseId = (databaseId: any): databaseId is string => {
	return databaseId;
};

export const loader: LoaderFunction =
	async (): Promise<NotionQueryDatabaseResponseResults> => {
		invariant(
			isValidNotionDatabaseId(NOTION_DATABASE_ID),
			`NOTION_DATABASE_ID is not a string: ${NOTION_DATABASE_ID}`
		);

		let database = await BLOG_POSTS.get<NotionQueryDatabaseResponseResults>('database', 'json');

		if (database) {
			return database
		}

		database = await getDatabase(NOTION_DATABASE_ID);

		await BLOG_POSTS.put('database', JSON.stringify(database))

		return database;
	};

export default function Index() {
	const blogs = useLoaderData<NotionQueryDatabaseResponseResults | undefined>();

	return (
		<section>
			<h1 className="animate-fade-and-slide-in-from-bottom">Blogs</h1>
			<ul>
				{blogs?.map((blog) => (
					<li key={blog.id}>
						<Link prefetch="intent" to={blog.id}>
							<Text
								text={
									(
										blog.properties.Name as Extract<
											typeof blog.properties.Name,
											{ type: "title" }
										>
									).title
								}
							/>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
	console.error(error);
	return (
		<div>
			<h1>Oops! There was an error in fetching the latest blog post list!</h1>
			<p>
				{error.name} : {error.message}
			</p>
			<pre>{error.stack}</pre>
			<hr />
		</div>
	);
}

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
}
