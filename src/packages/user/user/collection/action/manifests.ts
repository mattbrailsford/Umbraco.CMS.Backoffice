import { UmbCreateUserCollectionAction } from './create-user.collection-action.js';
import { UmbInviteUserCollectionAction } from './invite-user.collection-action.js';
import { ManifestTypes } from '@umbraco-cms/backoffice/extension-registry';

export const createManifest: ManifestTypes = {
	type: 'collectionAction',
	kind: 'button',
	name: 'Create User Collection Action',
	alias: 'Umb.CollectionAction.User.Create',
	api: UmbCreateUserCollectionAction,
	weight: 200,
	meta: {
		label: 'Create',
	},
};

export const inviteManifest: ManifestTypes = {
	type: 'collectionAction',
	kind: 'button',
	name: 'Invite User Collection Action',
	alias: 'Umb.CollectionAction.User.Invite',
	api: UmbInviteUserCollectionAction,
	weight: 100,
	meta: {
		label: 'Invite',
	},
};

export const manifests = [createManifest, inviteManifest];
