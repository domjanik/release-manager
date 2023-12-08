export class ReleaseDTO {
  constructor(
    public platform: string = 'MetaCritic',
    public projectName: string = 'Fandom-Player',
    public version: string = '1.2.3',
    public publishedBy: string = '',

    public publishedAt: Date = new Date(),
    public geo: string | undefined,
    public description: string | undefined,
  ) {}
}
