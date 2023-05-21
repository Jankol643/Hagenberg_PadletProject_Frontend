import {Padlet} from "./padlet";

export class PadletFactory {
  static empty(): Padlet {
    return new Padlet(0, '', 0, 0, [{id: 0, entryText: '', rating: 0}])
  }

  static fromObject(rawPadlet: any) : Padlet {
    return new Padlet(
      rawPadlet.id,
      rawPadlet.title,
      rawPadlet.user_id,
      rawPadlet.is_public,
      rawPadlet.entries
    )
  }
}
