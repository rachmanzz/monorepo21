import {NextFunction, Request, Response} from "express";
import {z, ZodSchema} from "zod";

const zodValidator = (schema: ZodSchema) => {
    type schemaType = z.infer<typeof schema>
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      req: Request<any, any, schemaType>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const contentType = req.headers["content-type"];
        if (!contentType || contentType !== "application/json") {
          throw new Error("Invalid content type. Expected application/json.");
        }
        schema.parse(req.body);
        next();
      } catch (error) {
        if (error instanceof z.ZodError) {
          res.status(400).json({
            status: "ERROR",
            message: "Validation failed",
            errors: error.errors,
          });
          return;
        }
        if (error instanceof Error) {
          // we need filter and error for production case,
          // but in this case I pass them status to 500
          res.status(500).json({
            status: "ERROR",
            message: error.message,
          });
          return;
        }

        res.status(500).json({
          status: "ERROR",
          message: "unknown error message",
        });
      }
    };
};

export default zodValidator;
