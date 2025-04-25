import { integerSchema } from "@meow-meow-dev/server-utilities/validation"
import * as v from "valibot"

function nullableNumberSchema<Min extends number, Max extends number>(
  min: Min,
  max: Max
): v.UnionSchema<
  [
    v.NullSchema<undefined>,
    v.SchemaWithPipe<
      readonly [
        v.NumberSchema<undefined>,
        v.MinValueAction<number, Min, undefined>,
        v.MaxValueAction<number, Max, undefined>,
      ]
    >,
  ],
  undefined
> {
  return v.union([
    v.null(),
    v.pipe(v.number(), v.minValue(min), v.maxValue(max)),
  ])
}

const rgbColorComponent = nullableNumberSchema(0, 255)

export const rgbColorComponentsSchema = v.tuple([
  rgbColorComponent,
  rgbColorComponent,
  rgbColorComponent,
])

export const rgbColorSchema = v.strictObject({
  colorSpace: v.literal("rgb"),
  components: rgbColorComponentsSchema,
  id: integerSchema,
})

export const hslColorComponentsSchema = v.tuple([
  nullableNumberSchema(0, 360),
  nullableNumberSchema(0, 1),
  nullableNumberSchema(0, 1),
])

export const hslColorSchema = v.strictObject({
  colorSpace: v.literal("hsl"),
  components: hslColorComponentsSchema,
  id: integerSchema,
})

export const oklchColorComponentsSchema = v.tuple([
  nullableNumberSchema(0, 1),
  nullableNumberSchema(0, 1),
  nullableNumberSchema(0, 360),
])

export const oklchColorSchema = v.strictObject({
  colorSpace: v.literal("hsl"),
  components: oklchColorComponentsSchema,
  id: integerSchema,
})

export const colorSchema = v.union([
  hslColorSchema,
  oklchColorSchema,
  rgbColorSchema,
])
