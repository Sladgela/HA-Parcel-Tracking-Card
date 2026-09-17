import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface ParcelConfig {
  type: string;
  title?: string;
  entities: string[];
}

@customElement('parcel-tracking-card')
export class ParcelTrackingCard extends LitElement {
  @property({ attribute: false }) public hass!: Record<string, any>;
  @state() private config!: ParcelConfig;

  public setConfig(config: ParcelConfig): void {
    if (!config || !config.entities || !Array.isArray(config.entities)) {
      throw new Error('Geef een lijst met entiteiten op via "entities".');
    }
    this.config = config;
  }

  public getCardSize(): number {
    return (this.config?.entities?.length || 1) + 1;
  }

  static styles = css`
    ha-card {
      padding: 16px;
      border-radius: 12px;
    }
    .header {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 12px;
      color: var(--primary-text-color);
    }
    .parcel-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .parcel-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      background: var(--card-background-color, #fafafa);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
    }
    .carrier {
      font-weight: 600;
      color: var(--primary-color, #03a9f4);
    }
    .status {
      font-size: 0.95rem;
      color: var(--secondary-text-color, #666);
    }
  `;

  render() {
    if (!this.hass || !this.config) {
      return html``;
    }

    return html`
      <ha-card>
        <div class="header">${this.config.title || 'Verwachte Pakketten'}</div>
        <div class="parcel-list">
          ${this.config.entities.map((entityId) => {
            const stateObj = this.hass.states[entityId];
            const name = stateObj?.attributes?.friendly_name || entityId;
            const stateText = stateObj ? stateObj.state : 'Onbekend';

            return html`
              <div class="parcel-item">
                <div>
                  <div class="carrier">${name}</div>
                </div>
                <div class="status">${stateText}</div>
              </div>
            `;
          })}
        </div>
      </ha-card>
    `;
  }
}

// Registratie voor Lovelace picker
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'parcel-tracking-card',
  name: 'Parcel Tracking Card',
  description: 'Toon bezorgmomenten van Nederlandse vervoerders (PostNL, DHL, Bol.com, etc.)',
  preview: true
});
