# Git Helper Web - Bug Fixes Summary (v3.0)

## Overview

This document summarizes the critical bug fixes and enhancements made to the Git Helper Web application. Version 3.0 includes complete implementations of ZIP extraction, multi-file selection fix, and full Git LFS upload support.

---

## Issues Fixed

### 1. ZIP File Extraction (NEW in v3.0)

**Problem:** When uploading .zip files, they were uploaded as-is instead of being extracted and having individual files uploaded.

**Solution:** Implemented automatic ZIP file extraction using the JSZip library.

**Features:**
- Automatic detection of ZIP files by extension and MIME type
- Extraction of all files while preserving folder structure
- Skips hidden files and macOS metadata folders (`__MACOSX`)
- Progress notification during extraction
- Files are displayed with their relative paths in the upload modal

**Code Changes:**
- Added `jszip` dependency
- Added `isZipFile()` function to detect ZIP archives
- Added `extractZipFile()` function to extract contents
- Modified `handleDrop()` to process ZIP files automatically

---

### 2. Multi-File Selection Fix (NEW in v3.0)

**Problem:** When selecting multiple files via drag and drop, only one file was being uploaded.

**Solution:** Fixed the file collection logic in the `handleDrop()` function.

**Root Cause:** The original code had issues with how files were collected from the `DataTransfer` object.

**Fix Details:**
- Properly iterate through all items in `e.dataTransfer.items`
- Added fallback to `e.dataTransfer.files` for browser compatibility
- Added console logging to track collected files
- All collected files are now properly added to the upload queue

---

### 3. Git LFS Integration - FULL Implementation (NEW in v3.0)

**Problem:** The previous "LFS support" was only a placeholder that created pointer files but never actually uploaded files to LFS storage.

**Solution:** Implemented complete Git LFS upload functionality.

**Features:**
- Files over 35MB are automatically uploaded via Git LFS
- Full LFS batch API integration
- SHA256 hash calculation for file integrity
- Proper LFS pointer file creation following Git LFS spec v1
- Upload verification when supported by the server
- Clear UI indicators showing which files will use LFS
- Support for files up to 2GB

**Technical Implementation:**
```javascript
// Upload file to Git LFS
const uploadToLFS = async (file, owner, repo) => {
  const arrayBuffer = await file.arrayBuffer();
  const sha256 = await calculateSHA256(arrayBuffer);
  const size = file.size;

  // Step 1: Request LFS batch API for upload URL
  const batchResponse = await fetch(
    `https://github.com/${owner}/${repo}.git/info/lfs/objects/batch`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.git-lfs+json',
        'Content-Type': 'application/vnd.git-lfs+json',
        'Authorization': `token ${githubToken}`
      },
      body: JSON.stringify({
        operation: 'upload',
        transfers: ['basic'],
        objects: [{ oid: sha256, size: size }]
      })
    }
  );

  // Step 2: Upload the actual file to LFS storage
  // Step 3: Verify the upload
  // Step 4: Return LFS pointer content
};
```

**Requirements:**
- Repository must have Git LFS enabled
- GitHub token must have appropriate permissions
- Sufficient LFS storage quota

---

### 4. Malformed Path Error (Fixed in v2.0)

**Problem:** Inconsistent path handling causing "malformed path" errors during uploads.

**Solution:** Created utility functions for path normalization and joining.

```javascript
const normalizePath = (path) => {
  if (!path || path === '/') return '';
  return path.replace(/^\/+|\/+$/g, '').replace(/\/+/g, '/');
};

const joinPaths = (...paths) => {
  const filtered = paths.filter(p => p && p !== '/');
  if (filtered.length === 0) return '';
  return normalizePath(filtered.join('/').replace(/\/+/g, '/'));
};
```

---

## Additional Improvements

### Enhanced File Size Display
- Files now show appropriate units (bytes, KB, MB, GB)
- LFS files are highlighted in blue with `[LFS]` indicator

### Improved Error Handling
- Specific error messages for LFS failures
- Clear guidance when LFS is not enabled
- Better validation error messages

### UI Enhancements
- Drop zone shows "ZIP files will be extracted automatically"
- Shows "Files up to 2GB supported (large files use Git LFS)"
- Processing indicator during ZIP extraction
- Scrollable file list for large uploads

### Numeric-Aware Sorting
- Repository contents are sorted with numeric awareness
- Directories appear before files
- Names like "001", "002", "010" sort correctly

---

## Dependencies

```json
{
  "@octokit/rest": "^22.0.0",
  "jszip": "^3.10.1",
  "react": "^19.1.0",
  "styled-components": "^6.1.18"
}
```

---

## File Size Limits

| File Type | Limit | Method |
|-----------|-------|--------|
| Regular files | 35 MB | Direct GitHub API upload |
| Large files | 2 GB | Git LFS upload |
| ZIP archives | 2 GB | Extracted, individual files uploaded |

---

## Testing Checklist

- [x] Upload single file under 35MB
- [x] Upload multiple files via multi-select
- [x] Upload ZIP file and verify extraction
- [x] Upload file over 35MB (requires LFS-enabled repo)
- [x] Verify folder structure preserved from ZIP
- [x] Test drag and drop with mixed file types
- [x] Verify error messages for oversized files

---

## Known Limitations

1. **LFS Storage Costs:** GitHub LFS has a 1GB free limit per account. Large file uploads may incur costs.

2. **LFS Repository Setup:** The target repository must have Git LFS enabled before uploading large files.

3. **Browser Memory:** Very large ZIP files may cause browser memory issues during extraction.

4. **Nested ZIPs:** ZIP files inside ZIP files are not recursively extracted.

---

## Version History

- **v3.0** (January 2026): Added ZIP extraction, fixed multi-file selection, implemented FULL LFS upload support
- **v2.0** (September 2025): Added LFS placeholder (pointer files only, not functional)
- **v1.1** (September 2025): Path normalization fixes
- **v1.0** (Initial): Basic file upload functionality

---

**Status:** Ready for production deployment  
**Max File Size:** 2GB with Git LFS support
