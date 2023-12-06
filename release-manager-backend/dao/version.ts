import { v4 as uuid } from 'uuid'
import { VersionDTO } from '../dto/versionDto'
import { ReleaseDTO } from '../dto/releaseDto'

export class Version {
  constructor(
    public projectName: string,
    public version: string,
    public createdBy: string,
    public description: string = '',
    public createdAt: Date = new Date(),
    public id: string = uuid()
  ) {}

  toDTO(releases: ReleaseDTO[] = []): VersionDTO {
    return new VersionDTO(this.projectName, this.version, this.createdBy, this.description, this.createdAt, releases)
  }

  fromDTO(versionDTO: VersionDTO): Version {
    return new Version(
      versionDTO.projectName,
      versionDTO.version,
      versionDTO.createdBy,
      versionDTO.description,
      versionDTO.createdAt,
      uuid()
    )
  }
}
