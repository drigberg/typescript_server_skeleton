import { nonEmptyString, number, object } from 'decoders';
import { Router } from 'express';

import categories from '../controllers/categories';
import things from '../controllers/things';
import { ApiError } from '../errors';

import type { NextFunction, Request, Response } from 'express';

const router = Router();

// Decoders allow us to validate data with type safety
// See: https://github.com/nvie/decoders
const thingDataDecoder = object({
  name: nonEmptyString,
  categoryId: number,
});

/**
 * Creates a thing
 */
async function createThing(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = thingDataDecoder.value(req.body);
    if (!data) {
      throw new ApiError(400, 'Invalid post format');
    }

    const category = await categories.getById(data.categoryId);

    const thing = await things.create({
      name: data.name,
      category,
    });

    res.json({
      thing: {
        id: thing.id,
        name: thing.name,
        categoryId: thing.categoryId,
      },
    });
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
