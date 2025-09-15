// Import the Pinecone library
import { Pinecone } from '@pinecone-database/pinecone'

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINCONE_API_KEY });

// Create a dense index with integrated embedding
const chatGptIndex = pc.Index('chat-gpt');

export async function createMemory({vectors,metadata,messageId}) {
   await chatGptIndex.upsert([{
    id:messageId,
    values:vectors,
    metadata
   }])
}

export async function queryMemory({queryVector, limit = 5,metadata}) {
  const data = await chatGptIndex.query({
    vector:queryVector,
    topK:limit,
    filter: metadata ? metadata : undefined,
    includeMetadata:true
  });
  return data.matches;
}

