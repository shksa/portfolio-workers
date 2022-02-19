import { Client } from "@notionhq/client";
import invariant from "tiny-invariant";
import { isValidNotionDatabaseId } from "./utils";

const notionClient = new Client({
  auth: NOTION_API_INTEGRATION_TOKEN,
});

const getDatabase = async () => {
  invariant(
    isValidNotionDatabaseId(NOTION_DATABASE_ID),
    `NOTION_DATABASE_ID is not a string: ${NOTION_DATABASE_ID}`
  );
  const response = await notionClient.databases.query({
    database_id: NOTION_DATABASE_ID,
  });
  return response.results as NotionQueryDatabaseResponseResults;
};

const getPage = (pageId: string) => {
  return notionClient.pages.retrieve({ page_id: pageId }) as Promise<NotionPageObjectResponse>;
};

const getBlocks = async (blockId: string) => {
  const blocks = [];
  let cursor;
  while (true) {
    // @ts-ignore
    const { results, next_cursor } = await notionClient.blocks.children.list({
      start_cursor: cursor,
      block_id: blockId,
    });
    blocks.push(...results);
    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }
  return blocks as NotionBlockObjectResponse[];
};

const getPageContent = async (id: string) => {
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

	const content = {
		page,
		blocks: blocksWithChildren,
	};

	return content;
}

export const notion = {
	getPageContent, getDatabase
}