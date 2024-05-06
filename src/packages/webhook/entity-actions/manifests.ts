import { UMB_WEBHOOK_DETAIL_REPOSITORY_ALIAS, UMB_WEBHOOK_ITEM_REPOSITORY_ALIAS } from '../repository/index.js';
import { UMB_WEBHOOK_ENTITY_TYPE } from '../entity.js';
import type { ManifestTypes } from '@umbraco-cms/backoffice/extension-registry';

const entityActions: Array<ManifestTypes> = [
	{
		type: 'entityAction',
		kind: 'delete',
		alias: 'Umb.EntityAction.Webhook.Delete',
		name: 'Delete Webhook Entity Action',
		forEntityTypes: [UMB_WEBHOOK_ENTITY_TYPE],
		meta: {
			detailRepositoryAlias: UMB_WEBHOOK_DETAIL_REPOSITORY_ALIAS,
			itemRepositoryAlias: UMB_WEBHOOK_ITEM_REPOSITORY_ALIAS,
		},
	},
];

export const manifests: Array<ManifestTypes> = [...entityActions];
