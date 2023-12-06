import { v4 as uuid } from 'uuid'
import { FeatureFlagLogDTO } from '../dto/featureFlagLogDto'

export class FeatureFlagLog {
  constructor(
    public platform: string,
    public name: string,
    public geo: string = 'XX',
    public sampling: number = 100,
    public changedBy: string,
    public value: string | number | boolean | object,
    public changedAt: Date = new Date(),
    public id: string = uuid()
  ) {}

  toDTO(): FeatureFlagLogDTO {
    return new FeatureFlagLogDTO(
      this.platform,
      this.name,
      this.geo,
      this.sampling,
      this.changedBy,
      this.value,
      this.changedAt,
      this.id
    )
  }

  static fromDTO(featureFlagLogDto: FeatureFlagLogDTO): FeatureFlagLog {
    return new FeatureFlagLog(
      featureFlagLogDto.platform,
      featureFlagLogDto.name,
      featureFlagLogDto.geo,
      featureFlagLogDto.sampling,
      featureFlagLogDto.changedBy,
      featureFlagLogDto.value,
      featureFlagLogDto.changedAt || new Date(),
      featureFlagLogDto.id || uuid()
    )
  }
}
