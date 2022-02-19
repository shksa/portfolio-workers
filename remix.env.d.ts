/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare-workers/globals" />
/// <reference types="@cloudflare/workers-types" />
import { GetBlockResponse, GetPageResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export {};

declare global {
	const NOTION_API_INTEGRATION_TOKEN: string;
	const NOTION_DATABASE_ID: string;
	type NotionBlockObjectResponse = Extract<GetBlockResponse, {type: string}>;
	type NotionPageObjectResponse = Extract<GetPageResponse, {properties: Object}>;
	type NotionRichTextItemResponse = Extract<GetBlockResponse, {paragraph: Object}>['paragraph']['text'][number];
	type NotionQueryDatabaseResponseResults = Array<
		Extract<QueryDatabaseResponse['results'][number], {properties: Object}>
	>
	type KVBlogPostsIndex = {hash: string, content: NotionQueryDatabaseResponseResults}
	type KVBlogPost = {hash: string, content: {
		page: NotionPageObjectResponse;
		blocks: NotionBlockObjectResponse[];
	}}
	const BLOG_POSTS: KVNamespace
}
