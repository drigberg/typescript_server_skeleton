import util from 'util';

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
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _log(fn: (text: string) => void, level: Level, text: string, data?: any) {
    if (LEVEL_VALUES[this._level] <= LEVEL_VALUES[level]) {
      const memoryMB = process.memoryUsage().heapUsed / 1024 / 1024;
      const memoryMBRounded = Math.round(memoryMB * 10) / 10;
      fn(
        `[${level}] [${memoryMBRounded} MB] ${text} ${
          data === undefined ? '' : util.inspect(data)
        }`
      );
    }
  }

  /**
   * Sets log level
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
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info(text: string, data?: any): void {
    this._log(console.info, 'INFO', text, data);
  }

  /**
   * Log error
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(text: string, data?: any): void {
    this._log(console.error, 'ERROR', text, data);
  }

  /**
   * Log warning
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warn(text: string, data?: any): void {
    this._log(console.warn, 'WARN', text, data);
  }

  /**
   * Log debug message
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug(text: string, data?: any): void {
    this._log(console.debug, 'DEBUG', text, data);
  }
}

/**
 * Module exports
 */

export default new Logger();
