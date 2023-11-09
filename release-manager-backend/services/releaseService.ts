import { Release } from "../dao/release";
import { ReleaseDTO } from "../dto/releaseDto";
import ReleaseDB from "../db/releaseDb";

async function addRelease(release: Release): Promise<void> {
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
