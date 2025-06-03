# JigsawStack Translation Widget CSS Selectors Reference

## Widget Container and Positioning

| Selector                      | Description           |
| ----------------------------- | --------------------- |
| `.translation-widget`         | Main container        |
| `.jigts-widget-trigger`       | Main widget trigger button |
| `.jigts-widget-dropdown`      | Dropdown menu container |

## Widget Trigger Button

| Selector                | Description         |
| ----------------------- | ------------------- |
| `.jigts-widget-trigger` | Main trigger button |
| `.jigts-trigger-content`| Content inside trigger |
| `.jigts-trigger-icon`   | Icon container in trigger |
| `.jigts-languages-icon` | Language globe icon (SVG) |
| `.jigts-trigger-loading`| Loading state container |
| `.jigts-loading-spinner`| Spinner animation |

## Dropdown Menu

| Selector                  | Description        |
| ------------------------- | ------------------ |
| `.jigts-widget-dropdown`  | Dropdown container |
| `.jigts-dropdown-header`  | Header section     |
| `.jigts-dropdown-title`   | Title area         |
| `.jigts-title-left`       | Left side of title (icon + text) |
| `.jigts-title-text`       | Title text         |
| `.jigts-language-count`   | Language count badge |

## Search Section

| Selector                | Description         |
| ----------------------- | ------------------- |
| `.jigts-search-container`| Search input container |
| `.jigts-search-icon`    | Search icon         |
| `.jigts-search-input`   | Input field         |
| `.jigts-clear-search`   | Clear search button |

## Reset Option

| Selector                | Description         |
| ----------------------- | ------------------- |
| `.jigts-reset-option`   | Reset to original language button |
| `.jigts-reset-icon`     | Reset icon (SVG)    |
| `.jigts-reset-text`     | Reset text container |
| `.jigts-reset-title`    | Reset title text    |
| `.jigts-reset-subtitle` | Reset subtitle text |

## Language List

| Selector                  | Description    |
| ------------------------- | -------------- |
| `.jigts-language-list`    | List container |
| `.jigts-language-item`    | Language item  |
| `.jigts-language-item.selected` | Selected item  |
| `.jigts-language-item.focused`  | Focused item   |
| `.jigts-language-name`    | Name text      |
| `.jigts-language-code`    | Code badge     |
| `.jigts-language-details` | Extra details  |
| `.jigts-no-results`       | No results message container |
| `.jigts-no-results-icon`  | No results icon (SVG) |

## Footer

| Selector           | Description    |
| ------------------ | -------------- |
| `.jigts-dropdown-footer` | Footer section |
| `.jigts-footer-text`     | Footer text    |

## Responsive Design & Accessibility

| Selector                              | Description        |
| ------------------------------------- | ------------------ |
| `@media (max-width: 640px)`           | Mobile styles      |
| `@media (prefers-contrast: high)`     | High contrast mode |
| `@media (prefers-reduced-motion: reduce)` | Reduced motion |

For more advanced customization, simply override any of the above selectors in your CSS. The widget is designed to be fully styleable! 