#!/usr/bin/env node
import { FastMCP, type Tool } from "fastmcp";
import { helloTool } from "./tools/hello.js";

async function main() {
	console.log("Initializing Hello MCP Server Template...");

	const server = new FastMCP({
		name: "Hello MCP Server",
		version: "0.0.1",
	});

	server.addTool(helloTool);

	try {
		await server.start({
			transportType: "stdio",
		});
		console.log("✅ Hello MCP Server started successfully over stdio.");
		console.log("   You can now connect to it using an MCP client.");
		console.log("   Try the HELLO_WORLD tool!");
	} catch (error) {
		console.error("❌ Failed to start Hello MCP Server:", error);
		process.exit(1);
	}
}

main().catch((error) => {
	console.error(
		"❌ An unexpected error occurred in the Hello MCP Server:",
		error,
	);
	process.exit(1);
});
