import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/Users/kamilpaluchowski/Desktop/hoc/node_modules/.pnpm/nuxt@3.5.1_sass@1.62.1/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}