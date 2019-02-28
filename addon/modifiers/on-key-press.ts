import Ember from 'ember';
import { assert } from '@ember/debug';

interface IState {
  element: Element | null;
  shortcut?: string;
  callback?: (element: Element) => void;
  eventOptions?: any;
}

export default Ember._setModifierManager(
  () => ({
    createModifier(): IState {
      return {
        element: null,
        shortcut: undefined,
        callback: undefined,
        eventOptions: undefined,
      };
    },

    installModifier(state: IState, element: Element, { positional: [shortcut, callback], named: eventOptions }) {
      assert(`callback in on-key-press modifier must be a function`, typeof callback === 'function');
      // TODO: assert valid shortcuts / key formats or something

      state.element = element;
      state.shortcut = shortcut;
      state.callback = callback;
      state.eventOptions = eventOptions;
    },

    updateModifier() { },

    destroyModifier() { },
  }),
  class OnKeyPressModifier {

  }
)
