import * as esbuild from 'esbuild'

await esbuild.build({
    entryPoints: ['./src/server/index.ts'],
    bundle: true,
    outfile: 'dist/out.js',
})