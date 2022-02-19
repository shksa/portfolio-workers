export const isValidNotionDatabaseId = (databaseId: undefined | string): databaseId is string => {
	return (databaseId?.length ?? 0) !== 0 ;
};