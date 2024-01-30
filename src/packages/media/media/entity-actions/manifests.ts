import { UMB_MEDIA_DETAIL_REPOSITORY_ALIAS } from '../repository/index.js';
import type { ManifestEntityAction } from '@umbraco-cms/backoffice/extension-registry';
import { UmbTrashEntityAction } from '@umbraco-cms/backoffice/entity-action';

const entityActions: Array<ManifestEntityAction> = [
	{
		type: 'entityAction',
		alias: 'Umb.EntityAction.Media.Trash',
		name: 'Trash Media Entity Action ',
		api: UmbTrashEntityAction,
		meta: {
			icon: 'icon-trash',
			label: 'Trash',
			repositoryAlias: UMB_MEDIA_DETAIL_REPOSITORY_ALIAS,
			entityTypes: ['media'],
		},
	},
];

export const manifests = [...entityActions];
