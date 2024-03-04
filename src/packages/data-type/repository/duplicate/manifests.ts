import { UmbDuplicateDataTypeRepository } from './data-type-copy.repository.js';
import type { ManifestRepository } from '@umbraco-cms/backoffice/extension-registry';

export const UMB_DUPLICATE_DATA_TYPE_REPOSITORY_ALIAS = 'Umb.Repository.DataType.Copy';

const copyRepository: ManifestRepository = {
	type: 'repository',
	alias: UMB_DUPLICATE_DATA_TYPE_REPOSITORY_ALIAS,
	name: 'Copy Data Type Repository',
	api: UmbDuplicateDataTypeRepository,
};

export const manifests = [copyRepository];
