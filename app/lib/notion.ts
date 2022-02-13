import { Client } from "@notionhq/client";

const notion = new Client({
  auth: NOTION_API_INTEGRATION_TOKEN,
});

export const getDatabase = async (databaseId: string) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  return response.results as QueryDatabaseResponseResults;
};

export const getPage = (pageId: string) => {
  return notion.pages.retrieve({ page_id: pageId }) as Promise<PageObjectResponse>;
};

export const getBlocks = async (blockId: string) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
  });
  return response.results as BlockObjectResponse[];
};
