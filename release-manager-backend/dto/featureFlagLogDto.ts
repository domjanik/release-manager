import { v4 as uuid } from 'uuid'

export class FeatureFlagLogDTO {
  constructor(
    public platform: string,
    public name: string,
    public changedBy: string,
    public value: string | number | boolean | object,

    public geo: string = 'XX',
    public sampling: number = 100,
    public changedAt: Date = new Date(),
    public id: string = uuid()
  ) {}
}
