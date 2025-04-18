import * as fs from 'fs';

interface PackageDependencies {
  dependencies: Record<string, string>;
}

interface SharedDependencies {
  [K: string]: {
    requiredVersion: string;
    singleton: boolean;
  };
}

export function getSharedDepsConfig(packagePath: string) {
  const sharedPackage = JSON.parse(
    fs.readFileSync(packagePath).toString()
  ) as PackageDependencies;

  return (
    Object.entries(sharedPackage.dependencies)
      // TODO: fix events package eager problem
      .filter(([packageName]) => packageName !== 'events')
      .reduce<SharedDependencies>(function (res, entry) {
        const dependency = entry[0];
        const version = entry[1];

        res[dependency] = {
          requiredVersion: version,
          singleton: true,
        };

        return res;
      }, {})
  );
}
