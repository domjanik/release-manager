import { v4 as uuid } from 'uuid'
import { ReleaseDTO } from '../dto/releaseDto'
import { Version } from './version'

export class Release {
  constructor(
    public platform: string,
    public geo: string = 'XX',
    public publishedBy: string,
    public publishedAt: Date = new Date(),
    public createdAt: Date = new Date(),
    public id: string = uuid(),
    public version: Version
  ) {}

  toDTO(): ReleaseDTO {
    return new ReleaseDTO(
      this.platform,
      this.version.projectName,
      this.version.version,
      this.publishedBy,
      this.publishedAt,
      this.geo,
      this.version.description
    )
  }

  static fromDTO(releaseDTO: ReleaseDTO, version: Version): Release {
    return new Release(
      releaseDTO.platform,
      releaseDTO.geo,
      releaseDTO.publishedBy,
      releaseDTO.publishedAt,
      new Date(),
      uuid(),
      version
    )
  }
}
