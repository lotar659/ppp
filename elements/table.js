/** @decorator */

import { PPPElement } from '../lib/ppp-element.js';
import {
  css,
  html,
  observable,
  repeat,
  when
} from '../vendor/fast-element.min.js';
import { display } from '../vendor/fast-utilities.js';
import { hotkey, normalize, typography } from '../design/styles.js';
import {
  bodyFont,
  fontSizeBody1,
  fontWeightBody1,
  lineHeightBody1,
  linkColor,
  paletteBlack,
  paletteBlueDark1,
  paletteBlueDark2,
  paletteBlueLight2,
  paletteBlueLight3,
  paletteGrayBase,
  paletteGrayDark1,
  paletteGrayDark2,
  paletteGrayDark3,
  paletteGrayDark4,
  paletteGrayLight2,
  paletteGrayLight3,
  paletteGreenBase,
  paletteGreenDark2,
  paletteGreenDark3,
  paletteGreenLight2,
  paletteGreenLight3,
  paletteRedDark2,
  paletteRedDark3,
  paletteRedLight2,
  paletteRedLight3,
  paletteWhite,
  paletteYellowDark2,
  paletteYellowDark3,
  paletteYellowLight2,
  paletteYellowLight3,
  spacing1,
  themeConditional
} from '../design/design-tokens.js';

const datumTemplate = repeat(
  (x) => x.cells,
  html`
    <td class="cell">
      <div class="cell-container">
        <span class="cell-text">${(x) => x}</span>
      </div>
    </td>
  `
);

export const tableTemplate = html`
  <template class="${(x) => (x?.rows?.length >= 10 ? 'long' : '')}">
    <table>
      <thead>
        <tr>
          ${repeat(
            (x) => x.columns,
            html`
              <th role="columnheader" scope="col">
                <div class="column-header">
                  <span class="column-header-text">${(x) => x.label}</span>
                </div>
              </th>
            `
          )}
        </tr>
      </thead>
      <tbody>
        ${repeat(
          (x) => x.sort(x.rows),
          html` <tr
            role="row"
            aria-disabled="false"
            class="row"
            :datum="${(x) => x.datum}"
          >
            ${datumTemplate}
          </tr>`
        )}
      </tbody>
    </table>
    ${when(
      (x) => !x.rows?.length,
      html` <div class="empty-message">Нет записей для отображения.</div>`
    )}
  </template>
`;

export const tableStyles = css`
  ${normalize()}
  ${hotkey()}
  ${display('flex')}
  table {
    font-family: ${bodyFont};
    position: relative;
    border-collapse: collapse;
    width: 100%;
    z-index: 0;
  }

  th {
    min-width: 40px;
    padding: 10px 8px;
    vertical-align: baseline;
    text-align: left;
    font-size: ${fontSizeBody1};
    line-height: ${lineHeightBody1};
    border-bottom: 3px solid
      ${themeConditional(paletteGrayLight2, paletteGrayDark2)};
    border-top-color: ${themeConditional(paletteGrayLight2, paletteGrayDark2)};
    border-right-color: ${themeConditional(
      paletteGrayLight2,
      paletteGrayDark2
    )};
    border-left-color: ${themeConditional(paletteGrayLight2, paletteGrayDark2)};
  }

  :host(.long) tr:nth-of-type(2n) {
    background-color: ${themeConditional(paletteGrayLight3, paletteGrayDark4)};
  }

  :host([sticky]) th {
    top: 0;
    position: sticky;
    background: ${themeConditional(paletteWhite, paletteBlack)};
    z-index: 2;
  }

  .column-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .column-header-text {
    padding-right: ${spacing1};
    color: ${themeConditional(paletteGrayDark3, paletteGrayLight2)};
  }

  .row {
    position: relative;
    z-index: 1;
    background-color: ${themeConditional(paletteWhite, paletteBlack)};
    color: ${themeConditional(paletteGrayDark3, paletteGrayLight2)};
  }

  :host([selectable]) tr.row:hover {
    background-color: ${themeConditional(paletteGrayLight2, paletteGrayDark3)};
    cursor: pointer;
  }

  .cell {
    min-width: 40px;
    padding: 8px;
    vertical-align: middle;
    font-size: ${fontSizeBody1};
    line-height: ${lineHeightBody1};
    position: relative;
  }

  .cell a {
    font-family: ${bodyFont};
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    line-height: 13px;
    color: ${linkColor};
    font-weight: ${fontWeightBody1};
  }

  .cell a:focus {
    outline: none;
  }

  .row > .cell:nth-child(1) {
    padding-left: 8px;
  }

  .cell-container {
    display: flex;
    align-items: center;
    min-height: 40px;
  }

  .empty-message {
    font-style: italic;
    padding: 5px;
    text-align: center;
  }

  .control-line {
    display: flex;
    flex-direction: row;
    gap: 0 8px;
  }

  .control-line.centered {
    align-items: center;
  }
`;

export class Table extends PPPElement {
  @observable
  columns;

  @observable
  rows;

  sort(data) {
    return data;
  }

  constructor() {
    super();

    this.columns = [];
    this.rows = [];
  }
}

export default Table.compose({
  template: tableTemplate,
  styles: tableStyles
}).define();
