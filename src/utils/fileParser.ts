export async function parsePackageJson(file: File): Promise<any> {
    const fileText = await file.text();
    return JSON.parse(fileText);
}

export function compareDependencies(packageJson: any, packageLockJson: any): Record<string, string> {
    const dependencies = packageJson.dependencies;
    const lockDependencies = packageLockJson.dependencies;
    const installedVersions: Record<string, string> = {};

    for (const [dependency, version] of Object.entries(dependencies)) {
        if (lockDependencies[dependency]) {
            installedVersions[dependency] = lockDependencies[dependency].version;
        } else {
            installedVersions[dependency] = '버전을 찾을 수 없음';
        }
    }

    return installedVersions;
}
