// ============================================
// API ROUTE: Save Portfolio Data
// Writes the admin panel data directly to public/data.js
// Endpoint: POST /api/save-data
// ============================================

import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body sent from admin panel
    const body = await request.json();
    const { data } = body;

    // Validate incoming data
    if (!data || typeof data !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid data payload" },
        { status: 400 }
      );
    }

    // Build the data.js file content
    const fileContent = `// ============================================
// PORTFOLIO DATA - Edit this file to update your portfolio
// Last updated: ${new Date().toISOString()}
// ============================================

const portfolioData = ${JSON.stringify(data, null, 2)};

if (typeof window !== "undefined") {
  window.portfolioData = portfolioData;
}
if (typeof module !== "undefined") {
  module.exports = portfolioData;
}
`;

    // Resolve the absolute path to public/data.js
    const filePath = path.join(process.cwd(), "public", "data.js");

    // Write the file (overwrites existing)
    await writeFile(filePath, fileContent, "utf-8");

    // Success response
    return NextResponse.json({
      success: true,
      message: "data.js saved successfully",
      path: "/public/data.js",
    });
  } catch (error: any) {
    // Return error details for debugging
    console.error("Failed to save data.js:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}