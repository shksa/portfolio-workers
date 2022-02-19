import { notion } from "~/lib/notion";
import {
	ActionFunction,
	Form,
	LoaderFunction,
	useFetcher,
	useLoaderData,
} from "remix";
import { Text } from "~/components/Text";
import { createHash } from "~/lib/hash";
import KV from "~/lib/kv";
import { useEffect } from "react";

export const loader: LoaderFunction = async () => {
	const [latestBlogPostsIndex, blogPostsIndexInKV] = await Promise.all([
		notion.getDatabase().then(async (value) => ({
			hash: await createHash(JSON.stringify(value)),
			content: value,
		})),
		KV.getBlogPostsIndex(),
	]);

	return {
		latestBlogPostsIndex,
		blogPostsIndexInKV,
	};
};

export default function Private() {
	const { blogPostsIndexInKV, latestBlogPostsIndex } = useLoaderData<{
		latestBlogPostsIndex: KVBlogPostsIndex;
		blogPostsIndexInKV: KVBlogPostsIndex | null;
	}>();
	
	const isBlogPostsIndexAlreadyInSync =
		latestBlogPostsIndex.hash === blogPostsIndexInKV?.hash;

	const { state, submission, Form } = useFetcher();
	const isBlogPostsIndexSyncing =
		state === "submitting" &&
		submission?.formData.get("_action") === "blog-posts-index";

	return (
		<section>
			<h1>Sync Notion and CF KV</h1>
			<ul>
				<li className={isBlogPostsIndexSyncing ? "opacity-25" : "opacity-100"}>
					Blog posts index
					<Form method="post" className="inline ml-4 border-2 px-2 py-1 bg-green-200 border-green-300 rounded-lg hover:bg-green-400">
						<button
							disabled={
								isBlogPostsIndexAlreadyInSync || isBlogPostsIndexSyncing
							}
							name="_action"
							value="blog-posts-index"
							type="submit"
						>
							{isBlogPostsIndexAlreadyInSync ? 'Syncd' : isBlogPostsIndexSyncing ? "Syncing..." : "Sync"}
						</button>
					</Form>
				</li>
				{latestBlogPostsIndex.content?.map((post) => (
					<PostItem post={post} key={post.id} />
				))}
			</ul>
		</section>
	);
}

const PostItem = ({
	post,
}: {
	post: NotionQueryDatabaseResponseResults[number];
}) => {
	const fetcher = useFetcher();
	let isSyncing =
		fetcher.state === "submitting" &&
		fetcher.submission.formData.get("id") === post.id;

	return (
		<li key={post.id} className={isSyncing ? "opacity-25" : "opacity-100"}>
			<Text
				text={
					(
						post.properties.Name as Extract<
							typeof post.properties.Name,
							{ type: "title" }
						>
					).title
				}
			/>
			<fetcher.Form method="post" className="inline ml-4 border-2 px-2 py-1 bg-green-200 border-green-300 rounded-lg hover:bg-green-400">
				<input type="hidden" name="id" value={post.id} />
				<button
					type="submit"
					name="_action"
					value="blog-post"
					disabled={isSyncing}
				>
					{isSyncing ? "Syncing..." : "Sync"}
				</button>
			</fetcher.Form>
		</li>
	);
};

export const action: ActionFunction = async ({ request }) => {
	const { _action, ...values } = Object.fromEntries(await request.formData());
	if (_action === "blog-posts-index") {
		await KV.updateBlogPostsIndex();
	} else {
		await KV.addOrUpdateNewBlogPost(values.id as string);
	}
  return null
};
