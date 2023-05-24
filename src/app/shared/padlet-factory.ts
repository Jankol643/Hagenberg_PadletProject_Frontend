import {Padlet} from "./padlet";

export class PadletFactory {
  static empty(): Padlet {
    return new Padlet(0, '', 0, 0, new Date(), [{id: 0, entryText: ''}])
  }

  static fromObject(rawPadlet: any) : Padlet {
    return new Padlet(
      rawPadlet.id,
      rawPadlet.title,
      rawPadlet.user_id,
      rawPadlet.is_public,
      typeof(rawPadlet.created_at) === 'string' ? new Date(rawPadlet.created_at) : rawPadlet.created_at,
      rawPadlet.entries
    )
  }
}
