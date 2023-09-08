import { build } from 'esbuild';
import path from 'node:path';
import { getSSRString } from './ssr';

const getClientBundle = async () => {
  const clientTSPath = path.resolve(__dirname, './App.tsx');
  const result = await build({
    entryPoints: [clientTSPath],
    format: 'esm',
    target: 'esnext',
    minify: true,
    sourcemap: false,
    tsconfigRaw: {
      compilerOptions: {
        "lib": ["ESNext", "DOM"],
        "module": "esnext",
        "target": "esnext",
        "moduleResolution": "bundler",
        "moduleDetection": "force",
        "allowImportingTsExtensions": true,
        "noEmit": true,
        "composite": true,
        "strict": true,
        "downlevelIteration": true,
        "skipLibCheck": true,
        "jsx": "react-jsx",
        "allowSyntheticDefaultImports": true,
        "forceConsistentCasingInFileNames": true,
        "allowJs": true,
        "types": [
          "bun-types" // add Bun global
        ]
      }
    },
    jsx: 'automatic',
    loader: {
      '.ts': 'ts',
      '.tsx': 'tsx',
    },
    bundle: true,
    treeShaking: true,
    platform: 'browser',
    outfile: path.resolve(__dirname, './dist/client.js'),
  })

  if (result.errors.length > 0) {
    throw new Error(result.errors[0].text)
  };

  return await Bun.file(path.resolve(__dirname, './dist/client.js'), { type: 'utf8' }).text();
}

export const View = async () => {
  const clientJS = await getClientBundle();
  const serverSideProps = { serverData: { name: 'Bun is awesome ! 👏' } };
  const ssr = getSSRString(serverSideProps);
  const html = `
    <div id="app">${ssr}</div>
    <script id="__SERVER_PROPS__">${JSON.stringify(serverSideProps)}</script>
    <script type="module">${clientJS}</script>`

  return html
};