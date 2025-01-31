const RELEASE_NOTES_DIR = 'release-notes'
const UNRELEASED_DIR = 'unreleased'
const GITKEEP_FILE = '.gitkeep'
const VERSION_FILE = 'version.json'

const PLATFORM_ANDROID = 'android'
const PLATFORM_IOS = 'ios'
const PLATFORM_WEB = 'web'

const PLATFORMS = [PLATFORM_WEB, PLATFORM_IOS, PLATFORM_ANDROID]

const MAIN_BRANCH = 'main'

type ReleaseInformation = {
  platform: typeof PLATFORMS[number]
  versionName: string
}
const tagId = ({ platform, versionName }: ReleaseInformation): string => `${versionName}-${platform}`

export {
  RELEASE_NOTES_DIR,
  UNRELEASED_DIR,
  GITKEEP_FILE,
  VERSION_FILE,
  PLATFORM_WEB,
  PLATFORM_IOS,
  PLATFORM_ANDROID,
  PLATFORMS,
  MAIN_BRANCH,
  tagId
}
