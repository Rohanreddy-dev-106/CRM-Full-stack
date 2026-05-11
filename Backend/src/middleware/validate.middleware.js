export function validateRequest(schemas) {
    return (req, res, next) => {
        const validationErrors = [];
        req.validated = req.validated || {};

        for (const [source, schema] of Object.entries(schemas)) {
            const result = schema.safeParse(req[source]);

            if (!result.success) {
                validationErrors.push({
                    source,
                    issues: result.error.issues.map((issue) => ({
                        path: issue.path.join("."),
                        message: issue.message
                    }))
                });
                continue;
            }

            req.validated[source] = result.data;
        }

        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: validationErrors
            });
        }

        next();
    };
}
