# Git Helper Web - Bug Fixes Summary (v3.1)

## Overview

This document summarizes the critical bug fixes and enhancements made to the Git Helper Web application. Version 3.1 includes auto-enable Git LFS functionality.

---

## Latest Feature: Auto-Enable Git LFS (v3.1)

### Problem
Users had to manually enable Git LFS for each repository before uploading large files, which was confusing for non-technical users.

### Solution
Implemented automatic Git LFS configuration that:
1. **Detects when large files are being uploaded** (>35MB)
2. **Automatically creates/updates `.gitattributes`** file in the repository
3. **Configures LFS tracking** for the uploaded file types
4. **Adds common large file patterns** for future uploads

### How It Works
When you upload a file larger than 35MB:
1. The tool checks if LFS tracking is needed
2. Automatically creates or updates `.gitattributes` with LFS patterns
3. Adds tracking for your file's extension (e.g., `*.zip`, `*.exe`)
4. Also adds common large file patterns for convenience
5. Proceeds with the LFS upload

### Pre-configured LFS Patterns
The auto-enable feature adds these common patterns:
- Archives: `*.zip`, `*.7z`, `*.rar`, `*.tar.gz`
- Executables: `*.exe`, `*.dll`, `*.so`, `*.dylib`
- Documents: `*.pdf`, `*.psd`, `*.ai`
- Video: `*.mp4`, `*.mov`, `*.avi`, `*.mkv`
- Audio: `*.mp3`, `*.wav`, `*.flac`
- Disk Images: `*.iso`, `*.dmg`

---

## Issues Fixed in v3.0

### 1. ZIP File Extraction

**Problem:** When uploading .zip files, they were uploaded as-is instead of being extracted.

**Solution:** Implemented automatic ZIP file extraction using JSZip library.

**Features:**
- Automatic detection of ZIP files
- Extraction preserving folder structure
- Skips hidden files and macOS metadata

---

### 2. Multi-File Selection Fix

**Problem:** When selecting multiple files via drag and drop, only one file was being uploaded.

**Solution:** Fixed the file collection logic in `handleDrop()` function.

**Fix Details:**
- Properly iterate through all items in `DataTransfer`
- Added fallback for browser compatibility
- All selected files now upload correctly

---

### 3. Git LFS - Full Implementation

**Problem:** Previous LFS support only created pointer files without actual upload.

**Solution:** Implemented complete Git LFS upload functionality.

**Features:**
- Full LFS batch API integration
- SHA256 hash calculation
- Actual file upload to LFS storage
- Upload verification
- Support for files up to 2GB

---

## File Size Limits

| File Type | Limit | Method |
|-----------|-------|--------|
| Regular files | 35 MB | Direct GitHub API upload |
| Large files | 2 GB | Git LFS upload (auto-enabled) |
| ZIP archives | 2 GB | Extracted, individual files uploaded |

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

## Version History

- **v3.1** (January 2026): Added auto-enable Git LFS functionality
- **v3.0** (January 2026): ZIP extraction, multi-file fix, full LFS support
- **v2.0** (September 2025): LFS placeholder (not functional)
- **v1.0** (Initial): Basic file upload functionality

---

**Status:** Ready for production deployment  
**Max File Size:** 2GB with auto-enabled Git LFS
