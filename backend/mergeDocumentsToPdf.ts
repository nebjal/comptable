// Fusion de documents en un seul PDF
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

export const mergeDocumentsToPdf = async (filePaths: string[], outputPath: string) => {
  const mergedPdf = await PDFDocument.create();

  for (const filePath of filePaths) {
    const fileData = fs.readFileSync(filePath);
    const pdf = await PDFDocument.load(fileData);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach(page => mergedPdf.addPage(page));
  }

  const mergedPdfBytes = await mergedPdf.save();
  fs.writeFileSync(outputPath, mergedPdfBytes);
  return { success: true, outputPath };
};
