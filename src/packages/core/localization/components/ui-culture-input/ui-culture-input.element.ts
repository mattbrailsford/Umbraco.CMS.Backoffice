import { UmbChangeEvent } from '@umbraco-cms/backoffice/event';
import { css, html, customElement, query, state } from '@umbraco-cms/backoffice/external/lit';
import { FormControlMixin, UUISelectElement } from '@umbraco-cms/backoffice/external/uui';
import { UmbLitElement } from '@umbraco-cms/internal/lit-element';
import { ManifestLocalization, umbExtensionsRegistry } from '@umbraco-cms/backoffice/extension-registry';

interface UmbCultureInputOption {
	name: string;
	value: string;
}

@customElement('umb-ui-culture-input')
export class UmbUiCultureInputElement extends FormControlMixin(UmbLitElement) {
	@state()
	private _options: Array<UmbCultureInputOption> = [];

	@query('uui-combobox')
	private _selectElement!: HTMLInputElement;

	set value(value: string) {
		const oldValue = this._value;
		this._value = value.toLowerCase();
		this.requestUpdate('value', oldValue);
	}

	constructor() {
		super();
		this.#observeTranslations();
	}

	#observeTranslations() {
		this.observe(
			umbExtensionsRegistry.extensionsOfType('localization'),
			(localizationManifests) => {
				this.#mapToOptions(localizationManifests);
			},
			'umbObserveLocalizationManifests',
		);
	}

	#mapToOptions(manifests: Array<ManifestLocalization>) {
		this._options = manifests
			.filter((isoCode) => isoCode !== undefined)
			.map((manifest) => ({
				name: manifest.name,
				value: manifest.meta.culture.toLowerCase(),
			}));
	}

	protected getFormElement() {
		return this._selectElement;
	}

	#onChange(event: Event) {
		event.stopPropagation();
		const target = event.composedPath()[0] as UUISelectElement;

		if (typeof target?.value === 'string') {
			this.value = target.value;
			this.dispatchEvent(new UmbChangeEvent());
		}
	}

	render() {
		return html` <uui-combobox value="${this._value}">
			<uui-combobox-list>
				${this._options.map(
					(option) => html`<uui-combobox-list-option value="${option.value}">${option.name}</uui-combobox-list-option>`,
				)}
			</uui-combobox-list>
		</uui-combobox>`;
	}

	static styles = [
		css`
			:host {
				display: block;
			}
		`,
	];
}

export default UmbUiCultureInputElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-ui-culture-input': UmbUiCultureInputElement;
	}
}
