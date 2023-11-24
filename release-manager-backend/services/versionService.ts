import { VersionDTO } from "../dto/versionDto";
import VersionDb from "../db/versionDb";
import { Version } from "../dao/version";
import releaseService from "./releaseService";
import { ReleaseDTO } from "../dto/releaseDto";

async function getVersions(): Promise<VersionDTO[]> {
  const releases = await releaseService.getRelease();
  const lastReleases: ReleaseDTO[] = releases
    .sort(
      (a: ReleaseDTO, b: ReleaseDTO) =>
        b.publishedAt.getTime() - a.publishedAt.getTime()
    )
    .reduce((acc: ReleaseDTO[], release: ReleaseDTO) => {
      const existingRelease = acc.find(
        (existingRelease) =>
          existingRelease.projectName === release.projectName &&
          existingRelease.geo === release.geo
      );
      if (!existingRelease) {
        acc.push(release);
      }
      return acc;
    }, []);
  const versions = (await VersionDb.getVersions()).map((version: Version) => {
    const releases = lastReleases.filter(
      (release) =>
        release.projectName === version.projectName &&
        release.version === version.version
    );
    return version.toDTO(releases);
  });
  return versions;
}

async function addVersion(version: Version) {
  return await VersionDb.addVersion(version);
}

async function getExistingVersion(release: ReleaseDTO): Promise<Version> {
  return await VersionDb.getVersion(release.projectName, release.version);
}

export default {
  addVersion,
  getExistingVersion,
  getVersions,
};
