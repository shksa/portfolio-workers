/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare-workers/globals" />
/// <reference types="@cloudflare/workers-types" />
import { GetBlockResponse, GetPageResponse, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export {};

declare global {
	const NOTION_API_INTEGRATION_TOKEN: string;
	const NOTION_DATABASE_ID: string;
	type BlockObjectResponse = Extract<GetBlockResponse, {type: string}>;
	type PageObjectResponse = Extract<GetPageResponse, {properties: Object}>;
	type RichTextItemResponse = Extract<GetBlockResponse, {paragraph: Object}>['paragraph']['text'][number];
	type QueryDatabaseResponseResults = Array<
		Extract<QueryDatabaseResponse['results'][number], {properties: Object}>
	>
}
