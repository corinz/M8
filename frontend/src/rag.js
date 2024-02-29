// Step 1: Load
import { JSONLoader } from "langchain/document_loaders/fs/json";
const loader = new JSONLoader("./data-large.json", ["/name"]);
const data = await loader.load();

// Step 2: Split the Document into chunks for embedding and vector storage.
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500, // TODO
    chunkOverlap: 0,
});
const splitDocs = await textSplitter.splitDocuments(data);
// console.log(splitDocs.map((d) => d.pageContent.slice(0, 100)))

// Step 3: Embed
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
const embeddings = new OpenAIEmbeddings();
const vectorStore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
);

// Step 4: Retrieval
const relevantDocs = await vectorStore.similaritySearch(
    "pod",
    100, // TODO: this is the number of results
);
console.log(relevantDocs.flat().map((d) => d.pageContent.slice(0, 100)));
// console.log(relevantDocs)

// Step 5: QA
import { RetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
const model = new ChatOpenAI({ modelName: "gpt-4-1106-preview" });
const template = `Kubernetes is an open-source container-orchestration system for automating computer application deployment, scaling, and management.
Use the following data that contains Kubernetes resource metadata and spec.
Use this data to answer the question at the end.
If you don't know the answer, just say "I don't know.", don't try to make up an answer.
Keep the answer as concise as possible, do not provide background information or an explanation.
{context}
Question: {question}
Helpful Answer:`;
const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(100), {
    prompt: PromptTemplate.fromTemplate(template),
});
const response = await chain._call({
    query: "What pods are in the bogus-system namespace?",
});

console.log(response)
