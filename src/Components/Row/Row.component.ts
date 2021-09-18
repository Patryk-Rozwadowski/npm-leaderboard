import { SEMANTIC_TAGS } from "../style/common.enum";
import { compareNumbers } from "../../sorters/compareNumbers";
import PhasesState from "../../PhasesState";

enum ROW_CLASS_STYLE {
   CONTAINER_ROW_LIST = "lb_row_wrapper",
   ROW = "lb_row",
   PLACE = "lb_row_place",
   CONTENT = "lb_row_content"
}

class Row extends PhasesState {
   constructor(private rowData: string[]) {
      super();
      this.createRow();
   }

   private rowOnClickHandler(e: Event) {
      console.log(e.target);
   }

   private createRow() {
      const rowContainer = document.createElement(SEMANTIC_TAGS.CONTAINER_ROW);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const sortedDataByPlace = this.rowData.data.sort(
         (a: { place: number }, b: { place: number }) => compareNumbers(a.place, b.place)
      );
      rowContainer.classList.add(ROW_CLASS_STYLE.CONTAINER_ROW_LIST);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Object.entries(sortedDataByPlace).map(([_, { place, content }]) => {
         const wrapper = document.createElement(SEMANTIC_TAGS.CONTAINER_ROW);
         wrapper.classList.add(ROW_CLASS_STYLE.ROW);

         const placeNode = document.createElement("p");
         placeNode.classList.add(ROW_CLASS_STYLE.PLACE);
         placeNode.textContent = `${place}`;

         const contentNode = document.createElement("p");
         contentNode.classList.add(ROW_CLASS_STYLE.CONTENT);
         contentNode.textContent = content;

         wrapper.appendChild(placeNode);
         wrapper.appendChild(contentNode);
         wrapper.addEventListener("click", this.rowOnClickHandler);
         rowContainer.appendChild(wrapper);
      });

      return rowContainer;
   }
}

export default Row;
