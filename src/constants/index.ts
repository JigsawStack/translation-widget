import { Position } from "../types";

export const MAX_CACHE_SIZE = 1000;
export const BATCH_SIZE = 10;
export const CACHE_PREFIX = "jss-";

export const DEFAULT_CONFIG = {
  pageLanguage: "en",
  autoDetectLanguage: false,
  position: Position.TopRight,
};
