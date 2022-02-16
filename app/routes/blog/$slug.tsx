import {
	ErrorBoundaryComponent,
	LoaderFunction,
	useCatch,
	useLoaderData,
} from "remix";
import invariant from "tiny-invariant";
import { Animate } from "~/components/Animate";
import { Block } from "~/components/Block";
import { Text } from "~/components/Text";
import { getBlocks, getPage } from "~/lib/notion";

const paramsHasValidSlugProp = (params: any): params is { slug: string } => {
	return (params.slug?.length ?? 0) !== 0;
};

type PostContentJSON = {
	page: NotionPageObjectResponse;
	blocks: NotionBlockObjectResponse[];
};

export const loader: LoaderFunction = async ({
	params,
}): Promise<PostContentJSON> => {
	invariant(
		paramsHasValidSlugProp(params),
		`expected a valid params.slug: ${params.slug}`
	);
	const id = params.slug;

	const KV_Key = `blogContentResponse-${id}`;

	let blogContentResponse = await BLOG_POSTS.get<PostContentJSON>(
		KV_Key,
		"json"
	);

	if (blogContentResponse) {
		return blogContentResponse;
	}

	const [page, blocks] = await Promise.all([getPage(id), getBlocks(id)]);

	// Retrieve block children for nested blocks (one level deep), for example toggle blocks
	// https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
	const childBlocks = await Promise.all(
		blocks
			.filter((block) => block.has_children)
			.map(async (block) => {
				return {
					id: block.id,
					children: await getBlocks(block.id),
				};
			})
	);

	const blocksWithChildren = blocks.map((block) => {
		// Add child blocks if the block should contain children but none exists
		// @ts-ignore
		if (block.has_children && !block[block.type].children) {
			// @ts-ignore
			block[block.type]["children"] = childBlocks.find(
				(x) => x.id === block.id
			)?.children;
		}
		return block;
	});

	blogContentResponse = {
		page,
		blocks: blocksWithChildren,
	};

	await BLOG_POSTS.put(KV_Key, JSON.stringify(blogContentResponse));

	return blogContentResponse;
};

export default function Post() {
	const data = useLoaderData<PostContentJSON | undefined>();

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

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
	console.error(error);
	return (
		<div>
			<h1>Oops! There was an error in fetching the blog post you wanted!</h1>
			<p>
				{error.name} : {error.message}
			</p>
			<pre>{error.stack}</pre>
			<hr />
		</div>
	);
};

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
