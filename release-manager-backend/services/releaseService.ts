import { Release } from "../dao/release";
import { ReleaseDTO } from "../dto/releaseDto";
import ReleaseDB from "../db/releaseDb";
import { Version } from "../dao/version";
import versionService from "./versionService";

async function addRelease(releaseDTO: ReleaseDTO): Promise<void> {
  let version: Version;
  const existingVersion = await versionService.getExistingVersion(releaseDTO);
  if (existingVersion) {
    version = existingVersion;
  } else {
    version = new Version(
      releaseDTO.projectName,
      releaseDTO.version,
      releaseDTO.publishedBy,
      releaseDTO.description,
      new Date()
    );
    await versionService.addVersion(version);
  }
  const release = Release.fromDTO(releaseDTO, version);

  return await ReleaseDB.addRelease(release);
}

async function getRelease(): Promise<ReleaseDTO[]> {
  return (await ReleaseDB.getRelease()).map((release) => {
    return release.toDTO();
  });
}

export default {
  addRelease,
  getRelease,
};
