import { localCapabilities } from './capabilities'

const ciConfiguration = () => {
  return process.env.CI
    ? {
        host: 'hub',
        port: 4444
      }
    : {}
}

export const config = {
  ...ciConfiguration(),

  runner: 'local',
  specs: ['./web/test/specs/**/*.ts'],
  exclude: [],
  maxInstances: 10,

  capabilities: [process.env.CI ? localCapabilities.ci : localCapabilities.chrome],
  logLevel: 'info',
  coloredLogs: true,
  bail: 0,
  baseUrl: 'http://localhost:9000',
  waitforTimeout: 100000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['selenium-standalone'],
  framework: 'jasmine',
  reporters: ['junit'],

  jasmineNodeOpts: {
    defaultTimeoutInterval: 120000
  },

  onPrepare: async function (): Promise<void> {
    const startupDelay = 20000
    await new Promise(resolve => setTimeout(resolve, startupDelay))
  },

  before: async function (): Promise<void> {
    await browser.setTimeout({ implicit: 80000 })
  }
}
