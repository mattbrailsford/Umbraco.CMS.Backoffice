// TODO: Rename to something more obvious, naming wise this can mean anything. I suggest: umbracoManagementApiPath()
export function umbracoPath(path: string) {
	return `/umbraco/management/api/v1${path}`;
}
