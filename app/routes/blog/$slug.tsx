import { json, LoaderFunction, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { Animate } from "~/components/Animate";
import { Block } from "~/components/Block";
import { Text } from "~/components/Text";
import KV from "~/lib/kv";
export {
	ErrorBoundary,
	CatchBoundary,
} from "~/components/ErrorAndCatchBoundry";

const paramsHasValidSlugProp = (params: any): params is { slug: string } => {
	return (params.slug?.length ?? 0) !== 0;
};

export const loader: LoaderFunction = async ({ params, request }) => {
	invariant(
		paramsHasValidSlugProp(params),
		`expected a valid params.slug: ${params.slug}`
	);

	let data = await KV.getBlogPost(params.slug)
	if (data === null) {
		throw new Response("Not Found", { status: 404 });
	}

	const { hash, content } = data;

	const etag = request.headers.get("If-None-Match");
	if (etag === `W/"${hash}"`) {
		return new Response(null, { status: 304 });
	}

	return json(content, {
		headers: {
			Etag: `W/"${hash}"`,
		},
	});
};

export default function Post() {
	const data = useLoaderData<KVBlogPost["content"] | undefined>();

	return (
		<Animate>
			<section>
				<h1 className="animate-fade-and-slide-in-from-bottom">
					{data?.page && (
						<Text
							text={
								(
									data.page.properties.Name as Extract<
										typeof data.page.properties.Name,
										{ type: "title" }
									>
								).title
							}
						/>
					)}
				</h1>
				<article className="-ml-8">
					{data?.blocks.map((block) => (
						<Block key={block.id} block={block} />
					))}
				</article>
			</section>
		</Animate>
	);
}
