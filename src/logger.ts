/**
 * Module
 */

type Level = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'SILENCE';

type LevelMap = { [key: string]: Level };

const LEVELS: LevelMap = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  SILENCE: 'SILENCE',
};

const LEVEL_VALUES: { [key: string]: number } = {
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  SILENCE: 5,
};

/**
 * Logger
 * @class
 */
class Logger {
  _level!: Level;
  levels: LevelMap;
  /**
   * Constructor
   */
  constructor() {
    this._level = LEVELS.DEBUG;
    this.levels = LEVELS;
  }

  /**
   * Logs content with label
   * @param {Function} fn - console function
   * @param {String} level - level text to output
   * @param {String} text - content
   */
  _log(fn: (text: string) => void, level: Level, text: string) {
    if (LEVEL_VALUES[this._level] <= LEVEL_VALUES[level]) {
      const memoryMB = process.memoryUsage().heapUsed / 1024 / 1024;
      const memoryMBRounded = Math.round(memoryMB * 10) / 10;
      fn(`[${level}] [${memoryMBRounded} MB] ${text}`);
    }
  }

  /**
   * @param {String} level
   */
  setLogLevel(level: Level): void {
    if (!Object.values(LEVELS).includes(level)) {
      const levels = Object.keys(LEVELS);
      throw new Error(`Invalid log level! Options are: ${levels.join(', ')}`);
    }
    this._level = level;
  }

  /**
   * Log info
   * @param {String} text
   */
  info(text: string): void {
    this._log(console.info, 'INFO', text);
  }

  /**
   * Log error
   * @param {String} text
   */
  error(text: string): void {
    this._log(console.error, 'ERROR', text);
  }

  /**
   * Log warning
   * @param {String} text
   */
  warn(text: string): void {
    this._log(console.warn, 'WARN', text);
  }

  /**
   * Log debug message
   * @param {String} text
   */
  debug(text: string): void {
    this._log(console.debug, 'DEBUG', text);
  }
}

/**
 * Module exports
 */

export default new Logger();
