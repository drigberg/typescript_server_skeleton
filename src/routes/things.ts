import { Router } from 'express';

import type { NextFunction, Request, Response } from 'express';

const router = Router();

/**
 * Creates a thing and returns its state
 */
async function createThing(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await new Promise((resolve) => resolve(true));
    res.json({ success: true });
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Connecting up the routes with middleware
 */

router.post('/', createThing);

export default router;
