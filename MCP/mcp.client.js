import { GoogleGenAI, Type } from "@google/genai";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import dotenv from 'dotenv';
dotenv.config();
const tools = [];

const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_API_KEY
});

const transport = new StdioClientTransport({
    command:"node",
    args:['./mcp.server.js']
});

const client = new Client({
    name:"example-client",
    version:"1.0.0"
});

await client.connect(transport);

client.listTools().then(async response=>{
    response.tools?.forEach(tool=>{
        tools.push({
            name:tool.name,
            description:tool.description,
            parameters:{
                type:"OBJECT",
                properties:tool.inputSchema.properties,
                required:tool.inputSchema.required || []
            }
        })
    });

    const aiResponse = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:"Add 2 numbers 45 and 67",
        config:{
            tools: [{
                functionDeclarations:tools
            }
            ]
        }
    });

    aiResponse.functionCalls.forEach(async call=>{
        const toolResponse = await client.callTool({
            name:call.name,
            arguments:call.args
        });

        console.log(toolResponse)
    })

});