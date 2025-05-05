import * as v from "valibot"

export const isoDateSchema = v.pipe(v.string(), v.isoDate())
