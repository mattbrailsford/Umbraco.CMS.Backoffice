import { TimeOptions } from './utils.js';
import { css, customElement, html, ifDefined, repeat, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbMediaTypeDetailRepository } from '@umbraco-cms/backoffice/media-type';
import { UmbModalRouteRegistrationController } from '@umbraco-cms/backoffice/router';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UMB_MEDIA_WORKSPACE_CONTEXT } from '@umbraco-cms/backoffice/media';
import { UMB_WORKSPACE_MODAL } from '@umbraco-cms/backoffice/modal';
import type { MediaUrlInfoModel } from '@umbraco-cms/backoffice/external/backend-api';
import type { UmbMediaWorkspaceContext } from '@umbraco-cms/backoffice/media';

// import of local components
import './media-workspace-view-info-history.element.js';
import './media-workspace-view-info-reference.element.js';

@customElement('umb-media-workspace-view-info')
export class UmbMediaWorkspaceViewInfoElement extends UmbLitElement {
	@state()
	private _mediaTypeUnique = '';

	@state()
	private _mediaTypeName?: string;

	@state()
	private _mediaTypeIcon?: string;

	@state()
	private _editMediaTypePath = '';

	@state()
	private _mediaUnique = '';

	#workspaceContext?: typeof UMB_MEDIA_WORKSPACE_CONTEXT.TYPE;

	#mediaTypeRepository = new UmbMediaTypeDetailRepository(this);

	@state()
	private _urls?: Array<MediaUrlInfoModel>;

	@state()
	private _createDate = 'Unknown';

	@state()
	private _updateDate = 'Unknown';

	constructor() {
		super();

		new UmbModalRouteRegistrationController(this, UMB_WORKSPACE_MODAL)
			.addAdditionalPath('media-type')
			.onSetup(() => {
				return { data: { entityType: 'media-type', preset: {} } };
			})
			.observeRouteBuilder((routeBuilder) => {
				this._editMediaTypePath = routeBuilder({});
			});

		this.consumeContext(UMB_MEDIA_WORKSPACE_CONTEXT, (context) => {
			this.#workspaceContext = context;
			this._mediaTypeUnique = this.#workspaceContext.getContentTypeId()!;
			this.#getData();
			this.#observeContent();
		});
	}

	async #getData() {
		const { data } = await this.#mediaTypeRepository.requestByUnique(this._mediaTypeUnique);
		this._mediaTypeName = data?.name;
		this._mediaTypeIcon = data?.icon;
	}

	#observeContent() {
		if (!this.#workspaceContext) return;

		this.observe(
			this.#workspaceContext.urls,
			(urls) => {
				this._urls = urls;
			},
			'__urls',
		);

		this.observe(
			this.#workspaceContext.unique,
			(unique) => {
				this._mediaUnique = unique!;
			},
			'_mediaUnique',
		);

		/** TODO: Doubt this is the right way to get the create date... */
		this.observe(this.#workspaceContext.variants, (variants) => {
			this._createDate = Array.isArray(variants) ? variants[0].createDate || 'Unknown' : 'Unknown';
			this._updateDate = Array.isArray(variants) ? variants[0].updateDate || 'Unknown' : 'Unknown';
		});
	}

	render() {
		return html`
			<div class="container">
				<uui-box headline=${this.localize.term('general_links')} style="--uui-box-default-padding: 0;">
					<div id="link-section">${this.#renderLinksSection()}</div>
				</uui-box>

				<umb-media-workspace-view-info-reference
					.mediaUnique=${this._mediaUnique}></umb-media-workspace-view-info-reference>

				<umb-media-workspace-view-info-history
					.mediaUnique=${this._mediaUnique}></umb-media-workspace-view-info-history>
			</div>
			<div class="container">
				<uui-box headline=${this.localize.term('general_general')} id="general-section"
					>${this.#renderGeneralSection()}</uui-box
				>
			</div>
		`;
	}

	#renderLinksSection() {
		/** TODO Make sure link section is completed */
		if (this._urls && this._urls.length) {
			return html`
				${repeat(
					this._urls,
					(url) => url.culture,
					(url) => html`
						<a href=${url.url} target="_blank" class="link-item with-href">
							<span class="link-language">${url.culture}</span>
							<span class="link-content"> ${url.url}</span>
							<uui-icon name="icon-out"></uui-icon>
						</a>
					`,
				)}
			`;
		} else {
			return html`
				<div class="link-item">
					<span class="link-language">en-EN</span>
					<span class="link-content italic"><umb-localize key="content_parentNotPublishedAnomaly"></umb-localize></span>
				</div>
			`;
		}
	}

	#renderGeneralSection() {
		return html`
			<div class="general-item">
				<strong><umb-localize key="content_createDate"></umb-localize></strong>
				<span>
					<umb-localize-date .date=${this._createDate} .options=${TimeOptions}></umb-localize-date>
				</span>
			</div>
			<div class="general-item">
				<strong><umb-localize key="content_updateDate"></umb-localize></strong>
				<span>
					<umb-localize-date .date=${this._updateDate} .options=${TimeOptions}></umb-localize-date>
				</span>
			</div>
			<div class="general-item">
				<strong><umb-localize key="content_documentType">Document Type</umb-localize></strong>
				<uui-ref-node-document-type
					standalone
					href=${this._editMediaTypePath + 'edit/' + this._mediaTypeUnique}
					name=${ifDefined(this._mediaTypeName)}>
					<umb-icon slot="icon" name=${ifDefined(this._mediaTypeIcon)}></umb-icon>
				</uui-ref-node-document-type>
			</div>
			<div class="general-item">
				<strong><umb-localize key="template_id">Id</umb-localize></strong>
				<span>${this._mediaUnique}</span>
			</div>
		`;
	}

	static styles = [
		UmbTextStyles,
		css`
			:host {
				display: grid;
				gap: var(--uui-size-layout-1);
				padding: var(--uui-size-layout-1);
				grid-template-columns: 1fr 350px;
			}

			div.container {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-layout-1);
			}

			//General section

			#general-section {
				display: flex;
				flex-direction: column;
			}

			.general-item {
				display: flex;
				flex-direction: column;
				gap: var(--uui-size-space-1);
			}

			.general-item:not(:last-child) {
				margin-bottom: var(--uui-size-space-6);
			}

			// Link section

			#link-section {
				display: flex;
				flex-direction: column;
				text-align: left;
			}

			.link-item {
				padding: var(--uui-size-space-4) var(--uui-size-space-6);
				display: grid;
				grid-template-columns: auto 1fr auto;
				gap: var(--uui-size-6);
				color: inherit;
				text-decoration: none;
			}

			.link-language {
				color: var(--uui-color-divider-emphasis);
			}

			.link-content.italic {
				font-style: italic;
			}

			.link-item uui-icon {
				margin-right: var(--uui-size-space-2);
				vertical-align: middle;
			}

			.link-item.with-href {
				cursor: pointer;
			}

			.link-item.with-href:hover {
				background: var(--uui-color-divider);
			}
		`,
	];
}

export default UmbMediaWorkspaceViewInfoElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-media-workspace-view-info': UmbMediaWorkspaceViewInfoElement;
	}
}
