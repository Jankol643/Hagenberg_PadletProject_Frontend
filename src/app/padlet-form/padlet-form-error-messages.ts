export class ErrorMessage {

  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}

export const PadletFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Ein Padlettitel muss angegeben werden'),
  new ErrorMessage('entryText', 'required', 'Ein Eintragtext muss angegeben werden.'),
  new ErrorMessage('ispublic', 'required', 'Es muss ausgewählt werden, ob das Padlet öffentlich oder privat ist')
];
