import {terser} from 'rollup-plugin-terser'
import { defineConfig } from "rollup";

export default defineConfig({
  input: './main.js',
  plugins: [
    terser({
      numWorkers: 1
    })
  ],
  output: {
    dir: 'dist',
    format: 'esm'
  }
})
