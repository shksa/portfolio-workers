import { json, Link, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { Text } from "~/components/Text";
import { siteTitle } from "~/lib/constants";
import KV from "~/lib/kv";
export {
	ErrorBoundary,
	CatchBoundary,
} from "~/components/ErrorAndCatchBoundry";

export const loader: LoaderFunction = async ({ request }) => {
	let data = await KV.getBlogPostsIndex();
	if (data === null) {
		throw new Response("Not Found", { status: 404 });
	}

	const { hash, content } = data;

	const etag = request.headers.get("If-None-Match");
	if (etag === hash) {
		return new Response(null, { status: 304 });
	}

	return json(content, {
		headers: {
			etag: `"${hash}"`,
		},
	});
};

export let meta: MetaFunction = () => {
	return {
		title: `Blog - ${siteTitle}`,
	};
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
