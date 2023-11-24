import { ReleaseDTO } from "./releaseDto";

export class VersionDTO {
  constructor(
    public projectName: string,
    public version: string,
    public createdBy: string,
    public description: string,
    public createdAt: Date,
    public releases: ReleaseDTO[] = []
  ) {}
}
