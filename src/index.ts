import Mount from "./phases/mount/Mount";
import Logger from "./common/Logger/Logger";
import ParseData from "./phases/parseData/ParseData";
import { HeadersProps } from "./components/headers/types";
import { RowProperties } from "./components/row/types";
import "./components/style/style.scss";
import PhasesContext from "./phases/context/phases/PhasesContext";

enum LEADERBOARD_TYPE {
   SIMPLE = "simple",
   EXTENDED = "extended"
}

export interface LeaderboardType {
   extended?: boolean;
}

export interface LeaderboardOptions {
   headerTags: string | HTMLElement;
   logs: boolean;
}

export type LeaderboardOptionType = LeaderboardType & LeaderboardOptions;

interface LeaderboardConfig {
   rootContainer: HTMLElement;
   leaderboardData: RowProperties[];
   options: LeaderboardOptions;
   headers: HeadersProps;
}

class Leaderboard {
   private readonly _rootContainer;
   private _phasesContext: PhasesContext;
   private _logger: Logger;
   private _parsedData: RowProperties[];

   constructor({ rootContainer, leaderboardData, options }: LeaderboardConfig) {
      this._rootContainer = rootContainer;
      this._logger = new Logger(this as unknown as Leaderboard);

      this._phasesContext = new PhasesContext(
         new ParseData(rootContainer, leaderboardData, options)
      );
   }

   public init(): void {
      this._parsedData = this._phasesContext.execute();
      this._phasesContext.transitionTo(new Mount(this._rootContainer, this._parsedData));
      this._phasesContext.execute();
   }
}

export default Leaderboard;
