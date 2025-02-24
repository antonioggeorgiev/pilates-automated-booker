import { z } from "zod";

const MetaPageSchema = z.object({
  "current-page": z.number(),
  "per-page": z.number(),
  from: z.number(),
  to: z.number(),
  total: z.number(),
  "last-page": z.number(),
});

const PilatesIncludedSchema = z.object({
  type: z.string(),
  id: z.string(),
  attributes: z.object({
    start_at_input: z.string().optional(),
    start_at: z.string().optional(),
    end_at: z.union([z.string(), z.number()]).optional(),
    duration: z.union([z.string(), z.number()]).optional(),
    price: z.union([z.string(), z.number()]).optional(),
    price_type: z.string().optional(),
  }),
  relationships: z
    .object({
      employees: z
        .union([
          z.array(
            z.object({
              type: z.string(),
              id: z.string(),
            }),
          ),
          z.object({
            data: z.array(
              z.object({
                type: z.string(),
                id: z.string(),
              }),
            ),
          }),
        ])
        .optional(),
    })
    .optional(),
});

export const PilatesSlotSchema = z.object({
  included: z.array(PilatesIncludedSchema),
  meta: z.object({
    page: MetaPageSchema,
  }),
  links: z.record(z.string(), z.string()).optional(),
});

export type PilatesSlotsResponse = {
  id: string;
  startAt: string;
  endAt: string;
  duration: number;
  price: number;
  priceType: string;
  employeeId?: string;
};
