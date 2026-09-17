import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/parcel-card.ts',
  output: {
    file: 'dist/parcel-tracking-card.js',
    format: 'es',
    sourcemap: false
  },
  plugins: [
    resolve(),
    typescript()
  ]
};
