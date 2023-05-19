import { Entry} from "./entry";
export { Entry} from "./entry";

export class Padlet {
  constructor(
    public title: string,
    public user_id: number,
    public is_public: boolean,
    public entries: Entry[]
  ) {
  }
}
