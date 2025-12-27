"use client";

/**
 * Utility to export the avatar as a high-quality PNG image
 */
export async function exportToImage(element: HTMLElement, fileName: string = "flavitar_custom.png") {
  try {
    const svgElement = element.querySelector("svg");
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = 4; // 4x scale for high resolution
      canvas.width = 100 * scale;
      canvas.height = 100 * scale;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(downloadUrl);
        URL.revokeObjectURL(url);
      }, "image/png");
    };

    img.src = url;
  } catch (error) {
    console.error("Export failed:", error);
  }
}

/**
 * Utility to export the avatar as an SVG file
 */
export async function exportToSVG(element: HTMLElement, fileName: string = "flavitar_custom.svg") {
  try {
    const svgElement = element.querySelector("svg");
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("SVG Export failed:", error);
  }
}
