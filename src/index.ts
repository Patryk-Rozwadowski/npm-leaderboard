import PhasesContext from "./phases/Context/PhasesContext";
import Mount from "./phases/Mount/Mount";
import Logger from "./common/Logger/Logger";
import ParseData from "./phases/ParseData/ParseData";
import { Newable } from "./common/common.types";
import "./components/style/style.scss";

// TODO refactor leaderboardConfig interface
interface LeaderboardConfig {
   rootContainer: HTMLElement;
   // TODO data types
   data: [
      {
         place: number;
         content: string;
      }
   ];
   options: {
      headerTags: string | HTMLElement;
      avatar: string;
   };
   headers: string[];
}

class Leaderboard {
   private readonly _rootContainer;
   private _phasesContext: PhasesContext;
   private _logger: Logger;

   // TODO refactor constructor types/params
   constructor({ rootContainer, data, headers }: LeaderboardConfig) {
      this._rootContainer = rootContainer;
      this._logger = new Logger(this as unknown as Newable);

      if (!Array.isArray(data) || !data) {
         this._logger.log(`Data is not defined. Pass leaderboard information.`);
         return;
      }

      this._phasesContext = new PhasesContext(new Mount(rootContainer, data, headers));
   }

   private typeGuards() {
      if (
         typeof this._rootContainer === "undefined" ||
         !(this._rootContainer instanceof HTMLElement)
      ) {
         throw new Error(
            `Expected e to be an HTMLElement, was ${typeof this._rootContainer}.`
         );
      }
   }

   public init(): void {
      this.typeGuards();
      this._phasesContext.execute();

      this._phasesContext.transitionTo(new ParseData());
      this._phasesContext.execute();
   }
}

export default Leaderboard;
