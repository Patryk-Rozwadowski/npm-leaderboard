import TypographyFactory from "./typography/TypographyFactory";
import { LbCSSClass } from "../common/common.types";
import { COMPONENT_TYPES } from "../style/semanticTags/container.enum";
import DOMController from "../controllers/DOMController";

/**
 * @class ElementCreator is facade and it's used whenever is need to create
 * native DOM elements.
 */
class ElementCreator {
   private _DOMController;
   private _textFactory: TypographyFactory;
   private _element: HTMLElement;

   constructor() {
      this._DOMController = new DOMController();
      this._textFactory = new TypographyFactory();
   }

   get getElement(): HTMLElement {
      return this._element;
   }

   // TODO: move to container factory
   container(tag: COMPONENT_TYPES): ElementCreator {
      this._element = this._DOMController.createDOMElementWithTag(tag);
      return this;
   }

   createText(tag: COMPONENT_TYPES.TYPOGRAPHY, text: string): HTMLElement {
      const textProps = {
         tag,
         text
      };
      return this._textFactory.create(textProps);
   }

   appendStyles(...styleArgs: LbCSSClass[]): ElementCreator {
      styleArgs.map((style) => this._element.classList.add(style));
      return this;
   }
}

export default ElementCreator;
