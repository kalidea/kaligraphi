# Purpose

`<kal-expansion-panel>` provides an expandable details-summary view.

### Expansion-panel content

Each expansion-panel must include a header and may optionally include an action bar.

#### Header

The `<kal-expansion-panel-header>` shows a summary of the panel content and acts
as the control for expanding and collapsing.

By default, the expansion-panel header includes a toggle icon at the end of the
header to indicate the expansion state. This icon can be hidden via the
`hideToggle` property.

```html
<kal-expansion-panel>

  <kal-expansion-panel-header>
      This is the expansion title
  </kal-expansion-panel-header>

  <kal-expansion-panel-content>
    <p>This is the primary content of the panel.</p>
  </kal-expansion-panel-content>

</kal-expansion-panel>
```

#### Action bar

Actions may optionally be included at the bottom of the panel, visible only when the expansion
is in its expanded state.

```html
<kal-expansion-panel>

  <kal-expansion-panel-header>
      This is the expansion title
  </kal-expansion-panel-header>

  <kal-expansion-panel-content>
    <p>This is the primary content of the panel.</p>
  </kal-expansion-panel-content>

  <kal-action-row>
    <kal-button>Click me</kal-button>
  </kal-action-row>

</kal-expansion-panel>
```

#### Disabling a panel

Expansion panels can be disabled using the `disabled` attribute. A disabled expansion panel can't
be toggled by the user, but can still be manipulated programkalically.

```html
<kal-expansion-panel [disabled]="isDisabled">

  <kal-expansion-panel-header>
      This is the expansion title
  </kal-expansion-panel-header>

  <kal-expansion-panel-content>
    <p>This is the primary content of the panel.</p>
  </kal-expansion-panel-content>

</kal-expansion-panel>
```

### Accordion

Multiple expansion-panels can be combined into an accordion. The `multi="true"` input allows the
expansions state to be set independently of each other. When `multi="false"` (default) just one
panel can be expanded at a given time:

```html
<kal-accordion multi>

  <kal-expansion-panel>
    <kal-expansion-panel-header>
      This is the expansion 1 title
    </kal-expansion-panel-header>

    <kal-expansion-panel-content>
      <p>This is the primary content of panel 1.</p>
    </kal-expansion-panel-content>

  </kal-expansion-panel>

  <kal-expansion-panel>
    <kal-expansion-panel-header>
       This is the expansion 2 title
    </kal-expansion-panel-header>

    <kal-expansion-panel-content>
      <p>This is the primary content of panel 2.</p>
    </kal-expansion-panel-content>

  </kal-expansion-panel>

</kal-accordion>
```

### Accessibility
The expansion-panel aims to mimic the experience of the native `<details>` and `<summary>` elements.
The expansion panel header has `role="button"` and also the attribute `aria-controls` with the
expansion panel's id as value.

The expansion panel headers are buttons. Users can use the keyboard to activate the expansion panel
header to switch between expanded state and collapsed state. Because the header acts as a button,
additional interactive elements should not be put inside of the header.
