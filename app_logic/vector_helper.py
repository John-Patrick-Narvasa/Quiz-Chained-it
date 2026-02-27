from langchain_ollama import OllamaEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document

from langchain_text_splitters import RecursiveCharacterTextSplitter

# 
def create_vector_store(chunks):
    """
    Creates a temporary vector store from text chunks.
    """

    embeddings = OllamaEmbeddings(model="mxbai-embed-large")

    documents = [Document(page_content=text) for text in chunks]


    vector_store = Chroma.from_documents(
        documents=documents,
        embedding=embeddings,
        collection_name="quiz_context"
    )

    return vector_store

# For retrieving relevant context
def get_relevant_context(vector_store, query, k):
    """
    Docstring for get_relevant_context
    
    :param vector_stor: Description
    :param query: Description
    :param k: Description
    """

    retriever = vector_store.as_retriever(search_kwargs={"k": k})
    relevant_docs = retriever.invoke(query)

    return "\n\n".join([doc.page_content for doc in relevant_docs])

# WHAT DOES IT DO? (EXAMPLE FOR SIMULATION)
"""
INPUT: 
chunks = [
    "A vegetable is a plant or part of a plant that is used as food. Examples include carrots, spinach, and potatoes.",
    "Fruits are typically sweet and contain seeds, while vegetables are more savory and do not contain seeds.",
    "Vegetables can be eaten raw or cooked, and they are an important source of vitamins and minerals in the diet.",
    "Common cooking methods for vegetables include steaming, boiling, roasting, and sautéing."
]
vector_store = create_vector_store(chunks)
relevant_context = get_relevant_context(vector_store, "What is a vegetable?")

OUTPUT:
"A vegetable is a plant or part of a plant that is used as food. Examples include carrots

"""

# DOES IT MAKE IT RAG? 

def get_smart_context(all_text, user_topic, k):
    embeddings = OllamaEmbeddings(model="mxbai-embed-large")

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1024, chunk_overlap=200)

    docs = [Document(page_content=text) for text in text_splitter.split_text(all_text)]

    vector_store = Chroma.from_documents(
        documents=docs,
        embedding=embeddings,
        collection_name="smart_context_db"
    )

    # CUSTOMIZABLE: Search for top N relevant documents chunks 
    retriever = vector_store.as_retriever(search_kwargs={"k": k})
    relevant_docs = retriever.invoke(user_topic)

    smart_context = "\n\n".join([doc.page_content for doc in relevant_docs])

    return smart_context

# SIMULATION (IF DATA IS IN ALL TEXT)
"""
INPUT:
all_text = "A vegetable is a plant or part of a plant that is used as food. Examples include carrots, spinach, and potatoes. Fruits are typically sweet and contain seeds, while vegetables are more savory and do not contain seeds. Vegetables can be eaten raw or cooked, and they are an important source of vitamins and minerals in the diet. Common cooking methods for vegetables include steaming, boiling, roasting, and sautéing."
user_topic = "What is a vegetable?"

PROCESS:
relevant_context = get_smart_context(all_text, user_topic)
1. Splits all_text into chunks using RecursiveCharacterTextSplitter.
2. Creates a vector store from the chunks using OllamaEmbeddings.
3. Retrieves the most relevant chunks based on user_topic.
4. Joins the retrieved chunks into a single string.

OUTPUT:
"A vegetable is a plant or part of a plant that is used as food. Examples include carrots, spinach, and potatoes."
"""
# SIMULATION (IF DATA IS NOT IN ALL TEXT)
"""
INPUT:
all_text = "Vegetables are an essential part of a healthy diet. They provide vitamins, minerals, and fiber that are crucial for maintaining good health. Different vegetables offer different nutritional benefits, so it's important to include a variety of them in your meals."
user_topic = "What is a dog?"

OUTPUT:
""
(the vector store is empty, so the function returns an empty string)
"""