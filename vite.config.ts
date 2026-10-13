/*
 * Software Name : Orange MCP Server Example
 * SPDX-FileCopyrightText: Copyright (c) Orange SA
 * SPDX-License-Identifier: Apache-2.0
 *
 * This software is distributed under the Apache-2.0 license,
 * see the "LICENSE" file for more details
 *
 * Authors: see MAINTAINERS.md
 * Software description: A Model Context Protocol (MCP) server
 * that provides tools to interact with
 * the Orange's Network APIs playground and administrative tools,
 * which follows the Camara specifications.
 */

import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/cloud-run.ts'),
      name: 'OrangeNetworkAPIMCP',
      fileName: 'cloud-run',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['node:fs', 'node:path', 'node:process'],
      output: {
        globals: {
          'node:fs': 'fs',
          'node:path': 'path',
          'node:process': 'process',
        },
      },
    },
    target: 'node24',
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
