import { Entry} from "./entry";
export { Entry} from "./entry";

export class Padlet {
  constructor(
    public id: number,
    public title: string,
    public user_id: number | null,
    public is_public: number,
    public created_at: Date,
    public entries?: Entry[]
  ) {
  }
}
