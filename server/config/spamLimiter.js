import slowDown from "express-slow-down";

export const speedLimiter = slowDown({
  windowMs: 5 * 60 * 1000, // 5 minutes
  delayAfter: 500, // allow 100 requests per windowMs, then...
  delayMs: () => 3000, // begin adding 1000ms of delay per request above delayAfter
});
