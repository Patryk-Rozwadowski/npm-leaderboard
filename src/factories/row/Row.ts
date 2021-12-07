import ElementCreator from "../ElementCreator";
import { Newable, SingleRowProperties } from "../../common/common.types";
import Logger from "../../common/Logger/Logger";
import DOMController from "../../controllers/DOMController";
import { ROW_CLASS_STYLE } from "../../style/styleClasses/row.enum";
import { SEMANTIC_TAGS } from "../../style/semanticTags";

interface RowContainers {
   placeContainer: HTMLElement;
   contentContainer: HTMLElement;
}

class Row {
   private _elementCreator: ElementCreator;
   private _rowListContainer: HTMLElement;
   private _logger: Logger;
   private _DOMController: DOMController;

   constructor(
      private _rootContainer: HTMLElement,
      private _rowData: SingleRowProperties
   ) {
      this._elementCreator = new ElementCreator();
      this._logger = new Logger(this as unknown as Newable);
      this._DOMController = new DOMController();
   }

   public create(): HTMLElement {
      this._rowListContainer = this._elementCreator
         .container(SEMANTIC_TAGS.CONTAINER_ROW)
         .appendStyles(ROW_CLASS_STYLE.ROW_LIST_CONTAINER).getElement;

      this._createRow();
      this._logger.groupEnd();
      return this._rowListContainer;
   }

   private _createRow() {
      const rowWrapper = this._elementCreator
         .container(SEMANTIC_TAGS.CONTAINER_ROW)
         .appendStyles(ROW_CLASS_STYLE.ROW_CONTAINER).getElement;

      const { contentContainer } = this._createRowContainers();
      const textContent = this._createRowTexts(this._rowData?.toString());

      DOMController.appendChildrenToContainer(contentContainer, textContent);
      DOMController.appendChildrenToContainer(rowWrapper, contentContainer);

      this._rowListContainer.appendChild(rowWrapper);
   }

   private _createRowContainers(): RowContainers {
      const placeContainer = this._elementCreator
         .container(SEMANTIC_TAGS.CONTAINER_ROW)
         .appendStyles(ROW_CLASS_STYLE.PLACE_CONTAINER).getElement;

      const contentContainer = this._elementCreator
         .container(SEMANTIC_TAGS.CONTAINER_ROW)
         .appendStyles(ROW_CLASS_STYLE.CONTENT_CONTAINER).getElement;

      return { placeContainer, contentContainer };
   }

   private _createRowTexts(txt: string): HTMLElement {
      return this._elementCreator.createText(SEMANTIC_TAGS.PRIMARY_TEXT, txt);
   }
}

export { ROW_CLASS_STYLE };
export default Row;
