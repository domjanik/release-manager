import { v4 as uuid } from "uuid";
import { Release } from "../dao/release";

export class ReleaseDTO {
  constructor(
    public platform: string,
    public projectName: string,
    public geo: string,
    public publishedBy: string,
    public version: string,
    public description: string,
    public publishedAt: Date,
    public id: string
  ) {}
}
