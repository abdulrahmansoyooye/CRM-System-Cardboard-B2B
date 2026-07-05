import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');

export function ensureUploadDir(): void {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

export function getUploadPath(filename: string): string {
  return path.join(UPLOAD_DIR, filename);
}

export function getPublicUrl(filename: string): string {
  const baseUrl = process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 4000}`;
  return `${baseUrl}/uploads/${filename}`;
}

export function deleteFile(filename: string): void {
  const filePath = getUploadPath(filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

export function getFileSize(filename: string): number | null {
  const filePath = getUploadPath(filename);
  if (fs.existsSync(filePath)) {
    return fs.statSync(filePath).size;
  }
  return null;
}
