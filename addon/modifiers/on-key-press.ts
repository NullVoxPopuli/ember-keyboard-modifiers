import Ember from 'ember';
import { assert } from '@ember/debug';
import ApplicationInstance from '@ember/application/instance';
import Service from '@ember/service';

type ModifierFunc = (element: Element) => void;

interface IModifierArgs {
  positional: [string, ModifierFunc];
  named: any;
}


interface IModifierManagerFactory<TState, TArgs> {
  createModifier(factory: any, args: TArgs): TState;
  installModifier(instance: TState, element: Element, args: TArgs): void;
  updateModifier(instance: TState, args: TArgs): void;
  destroyModifier(instance: TState, args: TArgs): void;
}

// state;
class KeyboardModifier {
  element: Element | null;
  shortcut?: string;
  callback?: ModifierFunc;
  eventOptions: any;
  keyboardService: typeof Service;

  constructor(args: IModifierArgs, keyboardService: typeof Service) {
    this.element = null;
    this.keyboardService = keyboardService;
  }
}

function createManager(owner: ApplicationInstance): IModifierManagerFactory<KeyboardModifier, IModifierArgs> {
  return {
    createModifier(factory, args) {
      let keyboardService = owner.lookup('service:keyboard');

      assert(`keyboard service not found. do you have ember-keyboard installed?`, keyboardService);

      return factory.create(args, keyboardService);
    },

    installModifier(
      instance,
      element, {
        positional: [shortcut, callback],
        named: eventOptions
      }) {
      assert(`callback in on-key-press modifier must be a function`, typeof callback === 'function');
      // TODO: assert valid shortcuts / key formats or something
      // TODO: global config for asserting against common a11y tools? (don't override those)

      instance.element = element;
      instance.shortcut = shortcut;
      instance.callback = callback;
      instance.eventOptions = eventOptions;

      instance.keyboardService.register(instance);
    },

    updateModifier(
      instance, {
      positional: [shortcut, callback],
      named: eventOptions
    }) {
      instance.shortcut = shortcut;
      instance.callback = callback;
      instance.eventOptions = eventOptions;
    },

    destroyModifier(instance) {
      instance.keyboardService.unregister(instance);
    },
  }
}

// https://github.com/emberjs/rfcs/blob/master/text/0373-Element-Modifier-Managers.md
export default Ember._setModifierManager(createManager, KeyboardModifier);
