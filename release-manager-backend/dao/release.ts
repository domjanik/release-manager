import { v4 as uuid } from "uuid";
import { ReleaseDTO } from "../dto/releaseDto";

export class Release {
  constructor(
    public platform: string,
    public projectName: string,
    public geo: string = "XX",
    public publishedBy: string,
    public version: string,
    public description: string = "",
    public publishedAt: Date = new Date(),
    public createdAt: Date = new Date(),
    public id: string = uuid()
  ) {}

  toDTO(): ReleaseDTO {
    return new ReleaseDTO(
      this.platform,
      this.projectName,
      this.geo,
      this.publishedBy,
      this.version,
      this.description,
      this.publishedAt,
      this.id
    );
  }

  static fromDTO(releaseDTO: ReleaseDTO): Release {
    return new Release(
      releaseDTO.platform,
      releaseDTO.projectName,
      releaseDTO.geo,
      releaseDTO.publishedBy,
      releaseDTO.version,
      releaseDTO.description,
      releaseDTO.publishedAt,
      new Date(),
      releaseDTO.id
    );
  }
}
