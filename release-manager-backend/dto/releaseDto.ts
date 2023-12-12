export class ReleaseDTO {
  constructor(
    public platform: string,
    public projectName: string,
    public version: string,
    public publishedBy: string,

    public publishedAt: Date = new Date(),
    public geo: string | undefined,
    public description: string | undefined,
  ) {}
}
