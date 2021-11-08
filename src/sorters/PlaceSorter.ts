import { RowProperties } from "../components/row/types";
import Logger from "../common/Logger/Logger";
import { Newable } from "../common/common.types";

class PlaceSorter {
   private _logger: Logger;

   constructor(private dataToSort: RowProperties[]) {
      this._logger = new Logger(this as unknown as Newable);
   }

   private static comparePlaces(data: RowProperties[]) {
      return data.sort((a, b) => {
         return a.place - b.place;
      });
   }

   public ascendant(): RowProperties[] {
      this._logger.log("Sorting ascendant places.");
      return PlaceSorter.comparePlaces(this.dataToSort);
   }
}

export default PlaceSorter;
