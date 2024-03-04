import type { UmbDataTypeTreeStore } from '../../tree/data-type-tree.store.js';
import { UMB_DATA_TYPE_TREE_STORE_CONTEXT } from '../../tree/data-type-tree.store.js';
import { UmbDataTypeDetailRepository } from '../detail/data-type-detail.repository.js';
import { UmbDataTypeDuplicateServerDataSource } from './data-type-copy.server.data-source.js';
import type { UmbNotificationContext } from '@umbraco-cms/backoffice/notification';
import { UMB_NOTIFICATION_CONTEXT } from '@umbraco-cms/backoffice/notification';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import type { UmbDuplicateDataSource, UmbDuplicateDataSource } from '@umbraco-cms/backoffice/repository';
import { UmbRepositoryBase } from '@umbraco-cms/backoffice/repository';

export class UmbDuplicateDataTypeRepository extends UmbRepositoryBase implements UmbDuplicateRepository {
	#init: Promise<unknown>;
	#duplicateSource: UmbDuplicateDataSource;
	#detailRepository: UmbDataTypeDetailRepository;
	#treeStore?: UmbDataTypeTreeStore;
	#notificationContext?: UmbNotificationContext;

	constructor(host: UmbControllerHost) {
		super(host);
		this.#duplicateSource = new UmbDataTypeDuplicateServerDataSource(this);
		this.#detailRepository = new UmbDataTypeDetailRepository(this);

		this.#init = Promise.all([
			this.consumeContext(UMB_DATA_TYPE_TREE_STORE_CONTEXT, (instance) => {
				this.#treeStore = instance;
			}).asPromise(),

			this.consumeContext(UMB_NOTIFICATION_CONTEXT, (instance) => {
				this.#notificationContext = instance;
			}).asPromise(),
		]);
	}

	async duplicate(unique: string, targetUnique: string | null) {
		await this.#init;
		const { data: dataTypeCopyUnique, error } = await this.#duplicateSource.duplicate(unique, targetUnique);
		if (error) return { error };

		if (dataTypeCopyUnique) {
			const { data: dataTypeCopy } = await this.#detailRepository.requestByUnique(dataTypeCopyUnique);
			if (!dataTypeCopy) throw new Error('Could not find copied data type');

			// TODO: Be aware about this responsibility.
			// this.#treeStore!.append(dataTypeCopy);

			const notification = { data: { message: `Data type copied` } };
			this.#notificationContext!.peek('positive', notification);
		}

		return { data: dataTypeCopyUnique };
	}
}
