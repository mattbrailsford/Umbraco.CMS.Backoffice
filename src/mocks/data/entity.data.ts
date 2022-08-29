import { UmbData } from './data';

export interface Entity {
	id: number;
	key: string;
	name: string;
	icon?: string; // TODO: Should this be here?
	type: string;
	hasChildren: boolean; // TODO: Should this be here?
	parentKey: string;
}

export const data: Array<Entity> = [
	{
		id: 1,
		key: '865a11f9-d140-4f21-8dfe-2caafc65a971',
		type: 'member',
		parentKey: '24fcd88a-d1bb-423b-b794-8a94dcddcb6a',
		name: 'Member 1',
		hasChildren: false,
	},
	{
		id: 2,
		key: '06c6919c-6fa7-4aa5-8214-0582c721c472',
		type: 'member',
		parentKey: '24fcd88a-d1bb-423b-b794-8a94dcddcb6a',
		name: 'Member 2',
		hasChildren: true,
	},
	{
		id: 3,
		key: '725a26c4-158d-4dc0-8aaa-b64473b11aa8',
		type: 'member',
		parentKey: '06c6919c-6fa7-4aa5-8214-0582c721c472',
		name: 'Member 3',
		hasChildren: false,
	},
	{
		id: 4,
		key: '14be0f66-1472-452a-abde-9da6b4136073',
		parentKey: 'd46d144e-33d8-41e3-bf7a-545287e16e3c',
		type: 'memberGroup',
		name: 'Member Group 1',
		hasChildren: false,
	},
	{
		id: 5,
		key: '8d5cf29a-e73b-4bf5-ad56-8adf6cbf8766',
		parentKey: 'd46d144e-33d8-41e3-bf7a-545287e16e3c',
		type: 'memberGroup',
		name: 'Member Group 2',
		hasChildren: false,
	},
	{
		id: 1245,
		key: 'dt-1',
		parentKey: '3fd3eba5-c893-4d3c-af67-f574e6eded38',
		name: 'Text',
		hasChildren: false,
		type: 'dataType',
	},
	{
		id: 1244,
		key: 'dt-2',
		parentKey: '3fd3eba5-c893-4d3c-af67-f574e6eded38',
		name: 'Textarea',
		hasChildren: false,
		type: 'dataType',
	},
	{
		id: 1246,
		key: 'dt-3',
		parentKey: '3fd3eba5-c893-4d3c-af67-f574e6eded38',
		name: 'My JS Property Editor',
		hasChildren: false,
		type: 'dataType',
	},
	{
		id: 1247,
		key: 'dt-4',
		parentKey: '3fd3eba5-c893-4d3c-af67-f574e6eded38',
		name: 'Context Example',
		hasChildren: false,
		type: 'dataType',
	},
	{
		id: 1248,
		key: 'dt-5',
		parentKey: '3fd3eba5-c893-4d3c-af67-f574e6eded38',
		name: 'Content Picker (DataType)',
		hasChildren: false,
		type: 'dataType',
	},
	{
		id: 99,
		key: 'd81c7957-153c-4b5a-aa6f-b434a4964624',
		name: 'Document Type 1',
		type: 'documentType',
		hasChildren: false,
		parentKey: '055a17d0-525a-4d06-9f75-92dc174ab0bd',
	},
	{
		id: 100,
		key: 'a99e4018-3ffc-486b-aa76-eecea9593d17',
		name: 'Document Type 2',
		type: 'documentType',
		hasChildren: false,
		parentKey: '055a17d0-525a-4d06-9f75-92dc174ab0bd',
	},
	{
		id: 2001,
		key: 'f2f81a40-c989-4b6b-84e2-057cecd3adc1',
		name: 'Media 1',
		type: 'media',
		icon: 'picture',
		hasChildren: false,
		parentKey: '05a8b8bc-bd90-47cc-a897-e67c8fa682ee',
	},
	{
		id: 2002,
		key: '69431027-8867-45bf-a93b-72bbdabfb177',
		type: 'media',
		name: 'Media 2',
		icon: 'picture',
		hasChildren: false,
		parentKey: '05a8b8bc-bd90-47cc-a897-e67c8fa682ee',
	},
	{
		id: 1,
		key: '74e4008a-ea4f-4793-b924-15e02fd380d1',
		name: 'Document 1',
		type: 'document',
		icon: 'document',
		hasChildren: false,
		parentKey: '485d49ef-a4aa-46ac-843f-4256fe167347',
	},
	{
		id: 2,
		key: '74e4008a-ea4f-4793-b924-15e02fd380d2',
		name: 'Document 2',
		type: 'document',
		icon: 'favorite',
		hasChildren: false,
		parentKey: '485d49ef-a4aa-46ac-843f-4256fe167347',
	},
	{
		id: 3,
		key: 'cdd30288-2d1c-41b4-89a9-61647b4a10d5',
		name: 'Document 3',
		type: 'document',
		icon: 'document',
		hasChildren: false,
		parentKey: '485d49ef-a4aa-46ac-843f-4256fe167347',
	},
];

// Temp mocked database
class UmbEntityData extends UmbData<Entity> {
	constructor() {
		super(data);
	}

	getChildren(key: string) {
		return data.filter((item) => item.parentKey === key);
	}
}

export const umbEntityData = new UmbEntityData();
