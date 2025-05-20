import { z } from "zod";
const helloToolParams = z.object({
	name: z.string().optional(),
});

export const helloTool = {
	name: "HELLO_WORLD",
	description: "Responds with a simple greeting.",
	parameters: helloToolParams,
	execute: async (params: z.infer<typeof helloToolParams>) => {
		const nameToGreet = params.name || "World";
		return `Hello, ${nameToGreet}!`;
	},
} as const;
