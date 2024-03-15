import { UmbDocumentTreeRepository } from '../../tree/index.js';
import { html, customElement, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import type { UmbVariantableWorkspaceContextInterface } from '@umbraco-cms/backoffice/workspace';
import { UMB_VARIANT_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/workspace';
import type { UmbVariantModel } from '@umbraco-cms/backoffice/variant';
import { UmbVariantId } from '@umbraco-cms/backoffice/variant';
import type { UmbAppLanguageContext } from '@umbraco-cms/backoffice/language';
import { UMB_APP_LANGUAGE_CONTEXT } from '@umbraco-cms/backoffice/language';

// This is interface kept internal on purpose until we know if there are other use cases for this
interface UmbTreeItemWithVariantsModel {
	unique: string;
	variants: Array<{
		name: string;
		culture: string | null;
		segment: string | null;
	}>;
}

@customElement('umb-variant-workspace-breadcrumb')
export class UmbVariantWorkspaceBreadcrumbElement extends UmbLitElement {
	#workspaceContext?: UmbVariantableWorkspaceContextInterface<UmbVariantModel>;
	#treeRepository = new UmbDocumentTreeRepository(this);
	#appLanguageContext?: UmbAppLanguageContext;

	@state()
	_isNew = false;

	@state()
	_name: string = '';

	@state()
	_ancestors: UmbTreeItemWithVariantsModel[] = [];

	@state()
	_workspaceActiveVariantId?: UmbVariantId;

	@state()
	_appDefaultCulture?: string;

	constructor() {
		super();
		this.consumeContext(UMB_APP_LANGUAGE_CONTEXT, (instance) => {
			this.#appLanguageContext = instance;
			this.#observeDefaultCulture();
		});

		this.consumeContext(UMB_VARIANT_WORKSPACE_CONTEXT, (instance) => {
			this.#workspaceContext = instance;
			this.#requestAncestors();
			this.#observeWorkspaceActiveVariant();
		});
	}

	#observeDefaultCulture() {
		this.observe(this.#appLanguageContext!.appDefaultLanguage, (value) => {
			this._appDefaultCulture = value?.unique;
		});
	}

	#observeWorkspaceActiveVariant() {
		this.observe(
			this.#workspaceContext?.splitView.activeVariantsInfo,
			(value) => {
				if (!value) return;
				this._workspaceActiveVariantId = UmbVariantId.Create(value[0]);
				this.#observeActiveVariantName();
			},

			'breadcrumbWorkspaceActiveVariantObserver',
		);
	}

	#observeActiveVariantName() {
		this.observe(
			this.#workspaceContext?.name(this._workspaceActiveVariantId),
			(value) => (this._name = value || ''),
			'breadcrumbWorkspaceNameObserver',
		);
	}

	// TODO: we should move the fallback name logic to a helper class. It will be used in multiple places
	#getAncestorVariantName(ancestor: UmbTreeItemWithVariantsModel) {
		const fallbackName =
			ancestor.variants.find((variant) => variant.culture === this._appDefaultCulture)?.name ??
			ancestor.variants[0].name ??
			'Unknown';
		const name = ancestor.variants.find((variant) => this._workspaceActiveVariantId?.compare(variant))?.name;
		return name ?? `(${fallbackName})`;
	}

	async #requestAncestors() {
		const unique = this.#workspaceContext?.getUnique();
		if (!unique) throw new Error('Unique is not available');
		const { data } = await this.#treeRepository.requestTreeItemAncestors({ descendantUnique: unique });

		if (data) {
			this._ancestors = data;
		}
	}

	render() {
		return html`
			<uui-breadcrumbs>
				${this._ancestors.map(
					(ancestor) =>
						html`<uui-breadcrumb-item
							href="/section/content/workspace/document/edit/${ancestor.unique}/${this._workspaceActiveVariantId
								?.culture}"
							>${this.#getAncestorVariantName(ancestor)}</uui-breadcrumb-item
						>`,
				)}
				<uui-breadcrumb-item>${this._name}</uui-breadcrumb-item>
			</uui-breadcrumbs>
		`;
	}

	static styles = [UmbTextStyles];
}

export default UmbVariantWorkspaceBreadcrumbElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-variant-workspace-breadcrumb': UmbVariantWorkspaceBreadcrumbElement;
	}
}
