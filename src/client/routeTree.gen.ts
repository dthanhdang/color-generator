/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as ScalePaletteIndexImport } from './routes/scale-palette/index'
import { Route as RandomPaletteIndexImport } from './routes/random-palette/index'
import { Route as ImagePickerIndexImport } from './routes/image-picker/index'
import { Route as HarmonyPaletteIndexImport } from './routes/harmony-palette/index'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ScalePaletteIndexRoute = ScalePaletteIndexImport.update({
  id: '/scale-palette/',
  path: '/scale-palette/',
  getParentRoute: () => rootRoute,
} as any)

const RandomPaletteIndexRoute = RandomPaletteIndexImport.update({
  id: '/random-palette/',
  path: '/random-palette/',
  getParentRoute: () => rootRoute,
} as any)

const ImagePickerIndexRoute = ImagePickerIndexImport.update({
  id: '/image-picker/',
  path: '/image-picker/',
  getParentRoute: () => rootRoute,
} as any)

const HarmonyPaletteIndexRoute = HarmonyPaletteIndexImport.update({
  id: '/harmony-palette/',
  path: '/harmony-palette/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/harmony-palette/': {
      id: '/harmony-palette/'
      path: '/harmony-palette'
      fullPath: '/harmony-palette'
      preLoaderRoute: typeof HarmonyPaletteIndexImport
      parentRoute: typeof rootRoute
    }
    '/image-picker/': {
      id: '/image-picker/'
      path: '/image-picker'
      fullPath: '/image-picker'
      preLoaderRoute: typeof ImagePickerIndexImport
      parentRoute: typeof rootRoute
    }
    '/random-palette/': {
      id: '/random-palette/'
      path: '/random-palette'
      fullPath: '/random-palette'
      preLoaderRoute: typeof RandomPaletteIndexImport
      parentRoute: typeof rootRoute
    }
    '/scale-palette/': {
      id: '/scale-palette/'
      path: '/scale-palette'
      fullPath: '/scale-palette'
      preLoaderRoute: typeof ScalePaletteIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/harmony-palette': typeof HarmonyPaletteIndexRoute
  '/image-picker': typeof ImagePickerIndexRoute
  '/random-palette': typeof RandomPaletteIndexRoute
  '/scale-palette': typeof ScalePaletteIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/harmony-palette': typeof HarmonyPaletteIndexRoute
  '/image-picker': typeof ImagePickerIndexRoute
  '/random-palette': typeof RandomPaletteIndexRoute
  '/scale-palette': typeof ScalePaletteIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/harmony-palette/': typeof HarmonyPaletteIndexRoute
  '/image-picker/': typeof ImagePickerIndexRoute
  '/random-palette/': typeof RandomPaletteIndexRoute
  '/scale-palette/': typeof ScalePaletteIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/harmony-palette'
    | '/image-picker'
    | '/random-palette'
    | '/scale-palette'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/harmony-palette'
    | '/image-picker'
    | '/random-palette'
    | '/scale-palette'
  id:
    | '__root__'
    | '/'
    | '/harmony-palette/'
    | '/image-picker/'
    | '/random-palette/'
    | '/scale-palette/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  HarmonyPaletteIndexRoute: typeof HarmonyPaletteIndexRoute
  ImagePickerIndexRoute: typeof ImagePickerIndexRoute
  RandomPaletteIndexRoute: typeof RandomPaletteIndexRoute
  ScalePaletteIndexRoute: typeof ScalePaletteIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  HarmonyPaletteIndexRoute: HarmonyPaletteIndexRoute,
  ImagePickerIndexRoute: ImagePickerIndexRoute,
  RandomPaletteIndexRoute: RandomPaletteIndexRoute,
  ScalePaletteIndexRoute: ScalePaletteIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/harmony-palette/",
        "/image-picker/",
        "/random-palette/",
        "/scale-palette/"
      ]
    },
    "/": {
      "filePath": "index.ts"
    },
    "/harmony-palette/": {
      "filePath": "harmony-palette/index.ts"
    },
    "/image-picker/": {
      "filePath": "image-picker/index.ts"
    },
    "/random-palette/": {
      "filePath": "random-palette/index.ts"
    },
    "/scale-palette/": {
      "filePath": "scale-palette/index.ts"
    }
  }
}
ROUTE_MANIFEST_END */
