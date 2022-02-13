import { Link, LoaderFunction, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { Text } from "~/components/Text";
import { getDatabase } from "~/lib/notion";

// const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

const isValidNotionDatabaseId = (databaseId: any): databaseId is string => {
	return databaseId;
};

export const loader: LoaderFunction =
	async (): Promise<QueryDatabaseResponseResults> => {
		invariant(
			isValidNotionDatabaseId(NOTION_DATABASE_ID),
			`NOTION_DATABASE_ID is not a string: ${NOTION_DATABASE_ID}`
		);
		const database = await getDatabase(NOTION_DATABASE_ID);

		return database;
	};

export default function Blog() {
	const blogs = useLoaderData<QueryDatabaseResponseResults>();

	return (
		<>
			<h1>Blogs</h1>
			<ul>
				{blogs.map((blog) => (
					<li key={blog.id}>
						<Link to={blog.id}>
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
		</>
	);
}
