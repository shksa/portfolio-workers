import invariant from "tiny-invariant";
import { createHash } from "./hash";
import {notion} from "./notion";
import { isValidNotionDatabaseId } from "./utils";

const getBlogPostKey = (notionPageId: string) => `blog/${notionPageId}`

const getBlogPostsIndexKey = () => {
	invariant(
		isValidNotionDatabaseId(NOTION_DATABASE_ID),
		`NOTION_DATABASE_ID is not a string: ${NOTION_DATABASE_ID}`
	);
	return NOTION_DATABASE_ID
}

const addOrUpdateNewBlogPost = async (notionPageId: string) => {
	const content = await notion.getPageContent(notionPageId);
	const hash = await createHash(JSON.stringify(content));
	const kvBlogPost: KVBlogPost = { hash, content };
	await BLOG_POSTS.put(getBlogPostKey(notionPageId), JSON.stringify(kvBlogPost));
};

const updateBlogPostsIndex = async () => {
	const content = await notion.getDatabase();
	const hash = await createHash(JSON.stringify(content));
	const kvBlogPostsIndex: KVBlogPostsIndex = { hash, content };
	await BLOG_POSTS.put(getBlogPostsIndexKey(), JSON.stringify(kvBlogPostsIndex));
};

const getBlogPostsIndex = () => {
	return BLOG_POSTS.get<KVBlogPostsIndex>(getBlogPostsIndexKey(), "json");
};

const getBlogPost = (notionPageId: string) => {
	return BLOG_POSTS.get<KVBlogPost>(getBlogPostKey(notionPageId), "json");
};

const KV = {
	addOrUpdateNewBlogPost,
	updateBlogPostsIndex,
	getBlogPostsIndex,
	getBlogPost,
};

export default KV;
