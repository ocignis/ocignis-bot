import { defineConfig } from 'tsup';

const tsupConfig = defineConfig({
  entry: ['build-ocignis-shared/index.ts'],
  outDir: 'dist-ocignis-shared',
  format: ['cjs', 'esm'],
  clean: true,
  dts: true,
  tsconfig: 'tsconfigs/tsconfig.export.json',
});

// eslint-disable-next-line
export default tsupConfig;
