interface IDocPage {
  title: string;
  href: string;
  disabled?: boolean;
}

interface IDocGroup {
  title: string;
  pages?: IDocPage[];
  groups?: IDocGroup[];
}

export const pageIndex: IDocGroup[] = [
  {
    title: 'Getting Started',
    pages: [
      { href: '/start/overview', title: 'Overview' },
      { href: '/start/installation', title: 'Installation' },
      { href: '/start/usage', title: 'Usage' },
      { href: '/start/flex', title: 'Flex Props' },
      // { href: '/start/themes', title: 'Themes', disabled: true },
      { href: '/start/philosophy', title: 'Philosophy' },
    ],
  },
  {
    title: 'Components',
    groups: [
      {
        title: 'Core',
        pages: [
          { href: '/components/Button', title: 'Button' },
          { href: '/components/ButtonGroup', title: 'ButtonGroup' },
          { href: '/components/DiscloseButton', title: 'DiscloseButton' },
          { href: '/components/Menu', title: 'Menu' },
          { href: '/components/Modal', title: 'Modal' },
          { href: '/components/Slider', title: 'Slider' },
        ],
      },
      {
        title: 'Data Display',
        pages: [
          { href: '/components/Avatar', title: 'Avatar' },
          { href: '/components/AvatarGroup', title: 'AvatarGroup' },
          { href: '/components/Badge', title: 'Badge' },
          { href: '/components/Callout', title: 'Callout' },
          { href: '/components/ColorGrid', title: 'ColorGrid' },
          { href: '/components/ColorSwatch', title: 'ColorSwatch' },
          { href: '/components/List', title: 'List' },
          { href: '/components/Table', title: 'Table', disabled: true },
          { href: '/components/Tooltip', title: 'Tooltip' },
        ],
      },
      {
        title: 'Feedback',
        pages: [
          { href: '/components/Alert', title: 'Alert' },
          { href: '/components/EmptyResult', title: 'EmptyResult' },
          { href: '/components/Toast', title: 'Toast' },
        ],
      },
      {
        title: 'Forms',
        pages: [
          { href: '/components/CheckBox', title: 'CheckBox' },
          { href: '/components/FormField', title: 'FormField' },
          { href: '/components/Input', title: 'Input' },
          { href: '/components/Label', title: 'Label' },
          { href: '/components/RadioButton', title: 'RadioButton' },
          { href: '/components/Select', title: 'Select' },
          { href: '/components/TextArea', title: 'TextArea' },
          { href: '/components/ToggleSwitch', title: 'ToggleSwitch' },
        ],
      },
      {
        title: 'Layout',
        pages: [
          { href: '/components/Aside', title: 'Aside' },
          { href: '/components/Card', title: 'Card' },
          { href: '/components/Drawer', title: 'Drawer' },
          { href: '/components/Group', title: 'Group' },
          { href: '/components/Page', title: 'Page' },
          { href: '/components/ScrollArea', title: 'ScrollArea' },
          { href: '/components/Spacer', title: 'Spacer' },
          { href: '/components/SplitPane', title: 'SplitPane' },
          { href: '/components/Stack', title: 'Stack' },
        ],
      },
      {
        title: 'Navigation',
        pages: [
          { href: '/components/Breadcrumbs', title: 'Breadcrumbs' },
          { href: '/components/Link', title: 'Link', disabled: true },
          { href: '/components/Nav', title: 'Nav' },
        ],
      },
      {
        title: 'Text',
        pages: [
          { href: '/components/Code', title: 'Code' },
          { href: '/components/Header', title: 'Header' },
          { href: '/components/TextSpan', title: 'TextSpan' },
        ],
      },
    ],
  },
  {
    title: 'Hooks',
    pages: [
      { href: '/hooks/createCssTransition', title: 'createCssTransition' },
      { href: '/hooks/createDialogState', title: 'createDialogState' },
      { href: '/hooks/createElementSize', title: 'createElementSize' },
      { href: '/hooks/createFocusTrap', title: 'createFocusTrap' },
      { href: '/hooks/createFormValidation', title: 'createFormValidation' },
      { href: '/hooks/createTooltipWatcher', title: 'createTooltipWatcher' },
    ],
  },
  {
    title: 'Customization',
    pages: [
      { href: '/customize/designTokens', title: 'Design Tokens' },
      { href: '/customize/customStyle', title: 'Custom Styling' },
    ],
  },
  {
    title: 'Packages',
    pages: [
      { href: '/packages/dolmen-gizmos', title: 'dolmen-gizmos', disabled: true },
      { href: '/packages/dolmen-keys', title: 'dolmen-keys', disabled: true },
    ],
  },
];

export const pageIndexFlat: IDocPage[] = pageIndex
  .map(page => {
    const walk: (group: IDocGroup) => IDocPage[] = (group: IDocGroup) => {
      if (group.pages) {
        return group.pages.filter(page => !page.disabled);
      } else if (group.groups) {
        return group.groups.map(walk).flat();
      } else {
        return [];
      }
    };

    return walk(page);
  })
  .flat();
