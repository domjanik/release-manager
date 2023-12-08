# Work in progress
2. Zmienic featureFlagLog na Configuration i dodac pola:
   public type: string (GAM, Optimizely, ICBM, MW, Config),
   public subplatform: string, StarWarsWiki
3. Dodac widoki na Configuration
   1. GAM
   2. MW
   3. Optimizely
   4. Aktualny zmienic na ICBM
5. Dodac batchowa migracje danych
6. Dodac granularne dane nt. Projektow/Teamow
7. Dodac integracje ze Slackiem i Jira
8. Zmienic Mongo na MySQLa (?)

# Example Classes
export class Project {
  name = 'IdentityEngine';
  repository = 'https://some-url';
  ownership = 'TACO';

  notifications = {
    release: {
      jira: true,
      slack: true,
    },
    version: {
      jira: true,
      slack: true,
    },
    featureFlag: {
      jira: true,
      slack: true,
    }
  }
}

export class Team {
  name = 'TACO';
  slack = 'https://...';
}
