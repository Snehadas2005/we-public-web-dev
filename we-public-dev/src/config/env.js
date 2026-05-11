function readEnvValue(name) {
  return import.meta.env[name];
}

function isMissing(value) {
  return typeof value !== "string" || value.trim() === "";
}

export function getMissingRequiredEnvVars() {
  const apiBaseUrl = readEnvValue("VITE_API_BASE_URL");

  if (isMissing(apiBaseUrl)) {
    return ["VITE_API_BASE_URL"];
  }

  return [];
}

export function validateRequiredEnvVars() {
  const missingVars = getMissingRequiredEnvVars();

  if (missingVars.length > 0) {
    console.error(
      `[ENV] Missing required environment variable(s): ${missingVars.join(", ")}. ` +
        "Add them to your .env file and restart the app."
    );
  }

  return missingVars;
}

export const API_BASE_URL =
  readEnvValue("VITE_API_BASE_URL")?.trim() || "";
