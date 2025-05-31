// App state management utilities

const APP_LAUNCHED_KEY = "app_launched_before"

/**
 * Checks if the app has been launched before by checking local storage.
 * @returns {boolean} True if the app has been launched before, false otherwise.
 */
export function isFirstAppLaunch() {
  if (typeof window === "undefined") return false
  return localStorage.getItem(APP_LAUNCHED_KEY) !== "true"
}

/**
 * Marks the app as launched by setting a flag in local storage.
 */
export function markAppLaunched() {
  if (typeof window === "undefined") return
  localStorage.setItem(APP_LAUNCHED_KEY, "true")
}

/**
 * Resets the app launch state in local storage.
 */
export function resetAppLaunchState() {
  if (typeof window === "undefined") return
  localStorage.removeItem(APP_LAUNCHED_KEY)
}
