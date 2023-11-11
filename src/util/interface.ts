export enum AadhaarPdfValidation {
  SIGNATURE_NOT_PRESENT = "Signature not detected in document ❌",
  SIGNATURE_PRESENT = "Signature detected ✅",
  ERROR_PARSING_PDF = ".pdf document invalid ❌",
}

export enum AadhaarCertificateValidation {
  CERTIFICATE_CORRECTLY_FORMATTED = "Certificate correctly parsed ✅",
  ERROR_PARSING_CERTIFICATE = ".cer document invalid ❌",
  NO_PDF_UPLOADED = "No pdf document uploaded",
}

export enum AadhaarSignatureValidition {
  SIGNATURE_VALID = "Signature looks valid ✅",
  SIGNATURE_INVALID = "Signature looks invalid ❌",
  ERROR_VERIFYING_SIGNATURE = "An error occurred when verifying signature ❌",
}
