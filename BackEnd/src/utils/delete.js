import fs from 'fs';

export async function deleteLocalFiles(files) {
  if (!files) return;
  for (const key in files) {
    for (const file of files[key]) {
      try {
         fs.unlinkSync(file.path);
        console.log(`Deleted file: ${file.path}`);
      } catch (err) {
        console.warn(`Failed to delete file ${file?.path}: ${err?.message}`);
      }
    }
  }
}