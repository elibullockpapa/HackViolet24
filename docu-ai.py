from langchain_google_genai import GoogleGenerativeAI
from langchain_google_vertexai import VertexAI
# Other imports might be unnecessary unless used elsewhere in your code.
from openai import OpenAI
from getpass import getpass
import os

# Securely input API keys 
google_api_key = 'AIzaSyAGRYpZ--wO89C1XUnmDZH7P_PdEBIu988'
openai_api_key = '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'

# # Set up Google Generative AI
# llm = GoogleGenerativeAI(model="gemini-pro", google_api_key=google_api_key)
# try:
#     response_google = llm.invoke("What are some of the pros and cons of Python as a programming language?")
#     print(response_google)
# except Exception as e:
#     print(f"Error with Google Generative AI: {e}")

# Set up Vertex AI
project_id = "cwaipai"
model = VertexAI(model_name="gemini-pro", project=project_id)
try:
    response_vertex = model.invoke("Give me 10 jokes properly formatted")
    print(response_vertex)
except Exception as e:
    print(f"Error with Vertex AI: {e}")

# # Set up and use OpenAI
# os.environ['OPENAI_API_KEY'] = openai_api_key
# client = OpenAI()
# completion = client.chat.completions.create(
#   model="gpt-4",
#   messages=[
#     {"role": "system", "content": "You are a helpful assistant."},
#     {"role": "user", "content": "What are some of the pros and cons of MATLAB as a programming language?"}
#   ]
# )
# print(completion.choices[0].message)
