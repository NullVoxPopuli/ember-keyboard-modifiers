ember-keyboard-modifiers
==============================================================================

[Short description of the addon.]


Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-keyboard-modifiers
```


Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]

Potential Usage: 
```hbs
---
import Keys from 'lib/utils/keys';
---

<div id=ModalContainer
  {{on-key-press Keys.Esc (action this.close)}}
  {{on-key-press Keys.PageDown (action this.focusButton)}}
>
  {{yield}}

  <button onclick={{this.doIt}}>Do It!</button>
</div>
```
```ts
import Component from '@glimmer/component';

export default class Example extends Component {
  close(element) {
    element.classList.remove('open');
  }

  focusButton(element) {
    element.querySelector('button').focus();
  }
}
```

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
