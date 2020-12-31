/* Internal dependencies */
import { JWTTokenAttributes } from 'routes/middlewares/verifyToken'
import { FieldType } from 'routes/middlewares/upload'

declare global {
  namespace Express {
    interface Request {
      decoded: JWTTokenAttributes
    }
  }
}