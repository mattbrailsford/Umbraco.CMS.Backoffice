import { UmbControllerBase } from '@umbraco-cms/backoffice/class-api';
import { UmbContextToken } from '@umbraco-cms/backoffice/context-api';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import type { UmbApi } from '@umbraco-cms/backoffice/extension-api';
import {
	DocumentResource,
	type DocumentConfigurationResponseModel,
} from '@umbraco-cms/backoffice/external/backend-api';
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';

/**
 * A context for fetching and caching the document configuration.
 */
export class UmbDocumentConfigurationContext extends UmbControllerBase implements UmbApi {
	static DocumentConfiguration: Promise<DocumentConfigurationResponseModel | null>;

	constructor(host: UmbControllerHost) {
		super(host);
		this.provideContext(UMB_DOCUMENT_CONFIGURATION_CONTEXT, this);
	}

	/**
	 * Get the document configuration from the server, or return the cached configuration if it has already been fetched.
	 * @returns A promise that resolves to the document configuration, or null if the configuration could not be fetched.
	 */
	getDocumentConfiguration(): Promise<DocumentConfigurationResponseModel | null> {
		debugger;
		return (UmbDocumentConfigurationContext.DocumentConfiguration ??= this.fetchDocumentConfiguration());
	}

	/**
	 * Fetch the document configuration from the server.
	 * @returns A promise that resolves to the document configuration, or null if the configuration could not be fetched.
	 */
	async fetchDocumentConfiguration() {
		const { data } = await tryExecuteAndNotify(this, DocumentResource.getDocumentConfiguration());

		return data ?? null;
	}
}

export default UmbDocumentConfigurationContext;

export const UMB_DOCUMENT_CONFIGURATION_CONTEXT = new UmbContextToken<UmbDocumentConfigurationContext>(
	'UmbDocumentConfigurationContext',
);
