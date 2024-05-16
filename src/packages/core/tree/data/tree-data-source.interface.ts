import type { UmbTreeItemModel } from '../types.js';
import type {
	UmbTreeAncestorsOfRequestArgs,
	UmbTreeChildrenOfRequestArgs,
	UmbTreeRootItemsRequestArgs,
} from './types.js';
import type { UmbPagedModel, UmbDataSourceResponse } from '@umbraco-cms/backoffice/repository';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';

/**
 * Interface for a tree data source constructor.
 * @export
 * @interface UmbTreeDataSourceConstructor
 * @template TreeItemType
 */
export interface UmbTreeDataSourceConstructor<TreeItemType extends UmbTreeItemModel> {
	new (host: UmbControllerHost): UmbTreeDataSource<TreeItemType>;
}

/**
 * Interface for a tree data source.
 * @export
 * @interface UmbTreeDataSource
 * @template TreeItemType
 */
export interface UmbTreeDataSource<
	TreeItemType extends UmbTreeItemModel,
	TreeRootItemsRequestArgsType extends UmbTreeRootItemsRequestArgs = UmbTreeRootItemsRequestArgs,
	TreeChildrenOfRequestArgsType extends UmbTreeChildrenOfRequestArgs = UmbTreeChildrenOfRequestArgs,
	TreeAncestorsOfRequestArgsType extends UmbTreeAncestorsOfRequestArgs = UmbTreeAncestorsOfRequestArgs,
> {
	/**
	 * Gets the root items of the tree.
	 * @return {*}  {Promise<UmbDataSourceResponse<UmbPagedModel<TreeItemType>>>}
	 * @memberof UmbTreeDataSource
	 */
	getRootItems(args: TreeRootItemsRequestArgsType): Promise<UmbDataSourceResponse<UmbPagedModel<TreeItemType>>>;

	/**
	 * Gets the children of the given parent item.
	 * @return {*}  {Promise<UmbDataSourceResponse<UmbPagedModel<TreeItemType>>}
	 * @memberof UmbTreeDataSource
	 */
	getChildrenOf(args: TreeChildrenOfRequestArgsType): Promise<UmbDataSourceResponse<UmbPagedModel<TreeItemType>>>;

	/**
	 * Gets the ancestors of the given item.
	 * @return {*}  {Promise<UmbDataSourceResponse<Array<TreeItemType>>}
	 * @memberof UmbTreeDataSource
	 */
	getAncestorsOf(args: TreeAncestorsOfRequestArgsType): Promise<UmbDataSourceResponse<Array<TreeItemType>>>;
}
