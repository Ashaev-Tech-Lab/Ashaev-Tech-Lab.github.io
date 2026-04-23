import { cp, readdir, rm } from 'fs/promises';
import { resolve } from 'path';

async function deploy() {
  const distDir = resolve('dist');
  const rootDir = resolve('.');

  const entries = await readdir(distDir, { withFileTypes: true });
  for (const entry of entries) {
    const src = resolve(distDir, entry.name);
    const dest = resolve(rootDir, entry.name);

    await rm(dest, { recursive: true, force: true });
    await cp(src, dest, { recursive: true });
  }

  console.log('Deployment files copied from dist/ to project root.');
}

deploy().catch((error) => {
  console.error('Deploy failed:', error);
  process.exit(1);
});
