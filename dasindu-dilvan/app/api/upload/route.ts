// ============================================
// API ROUTE: File Upload
// Handles uploading photo, CV, and project images
// Saves files directly to the public/ folder
// Endpoint: POST /api/upload
// ============================================

import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    // Parse multipart form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    // uploadType can be: "photo", "cv", or "project"
    const uploadType = formData.get("type") as string;

    // Validate file presence
    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Convert File object to Buffer for writing
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine save location based on upload type
    let savePath: string;
    let publicUrl: string;

    if (uploadType === "photo") {
      // Profile photo - always saved as photo.jpg
      const ext = file.name.split(".").pop() || "jpg";
      savePath = path.join(process.cwd(), "public", `photo.${ext}`);
      publicUrl = `/photo.${ext}`;
    } else if (uploadType === "cv") {
      // CV/Resume - always saved as cv.pdf
      savePath = path.join(process.cwd(), "public", "cv.pdf");
      publicUrl = "/cv.pdf";
    } else if (uploadType === "project") {
      // Project images - saved with original filename in /projects
      const projectsDir = path.join(process.cwd(), "public", "projects");

      // Ensure /public/projects folder exists
      await mkdir(projectsDir, { recursive: true });

      // Sanitize filename (remove spaces/special chars)
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      savePath = path.join(projectsDir, safeName);
      publicUrl = `/projects/${safeName}`;
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid upload type" },
        { status: 400 }
      );
    }

    // Write file to disk
    await writeFile(savePath, buffer);

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      url: publicUrl,
    });
  } catch (error: any) {
    console.error("Upload failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Upload failed",
      },
      { status: 500 }
    );
  }
}