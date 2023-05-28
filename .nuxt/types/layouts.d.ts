import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default"
declare module "/Users/kamilpaluchowski/Desktop/hoc/node_modules/.pnpm/nuxt@3.5.1_sass@1.62.1/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}