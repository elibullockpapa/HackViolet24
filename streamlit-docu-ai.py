import streamlit as st
import requests
import base64
import os
import json
from openai import OpenAI
from openai import OpenAI

client = OpenAI(api_key=st.secrets["OPENAI_API_KEY"] if "OPENAI_API_KEY" in st.secrets else os.getenv("OPENAI_API_KEY"))

client = OpenAI()

# Function to process the document and get the summary
def get_document_text(encoded_content, access_token):
    payload = json.dumps({
        "skipHumanReview": True,
        "rawDocument": {
            "mimeType": "application/pdf",
            "content": encoded_content
        }
    })

    project_id = 'cwaipai'
    access_token = 'ya29.a0AfB_byBP9UcAGr-Y8ItZg_uwghu83fryxYu12nHcijlt7bqTuySCQSaKStvaBLSgasgrMsO4byN-t2o7MLFVlMd-skMU-ap4YEQzSvKP2uxjqEc6AvgxqGrQyEG6r0znNCANNFZr2x_zXZPCoa1_8HUUwExy33IXZiiWaCgYKAdMSARISFQHGX2Mi66-0Oqf82hpsc19iZQvCEw0171'
    endpoint_url = f"https://us-documentai.googleapis.com/v1/projects/450368740110/locations/us/processors/44657797e61c9b6b:process"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json; charset=utf-8"
    }

    response = requests.post(endpoint_url, headers=headers, data=payload)
    
    if response.ok:
        response_json = response.json()
        # Assuming the text is in the 'text' field of the 'document' object
        text_content = response_json.get('document', {}).get('text', '')
        return text_content
    else:
        return f"Error: {response.status_code}, {response.text}"

def get_summary(text_content):
    try:
        messages = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": f"Please summarize the following housing contract for me in 5 bullet points:\n\n{text_content}"}
        ]
        summary_response = client.chat.completions.create(model="gpt-4-0125-preview", messages=messages)
        summary = summary_response.choices[0].message.content
        return summary
    except Exception as e:
        return f"OpenAI Error: {str(e)}"

def get_answer(question, text_content):
    try:
        messages = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": f"Answer this question based on this housing contract in bullet points:\n\n{question}\n\nContext:\n{text_content}"}
        ]
        answer_response = client.chat.completions.create(model="gpt-4-0125-preview", messages=messages)
        answer = answer_response.choices[0].message.content

        return answer

    except Exception as e:
        return f"OpenAI Error: {str(e)}"

# def get_answer(question, text_content):
#     try:
#         cloudflare_ai_url = "https://worker-purple-shape-6e9d.sohampatil-ai.workers.dev"

#         payload = {
#             "prompt": question,
#             "context": text_content 
#         }

#         response = requests.post(cloudflare_ai_url, json=payload)

#         # Check if the response is OK
#         if response.ok:
#             response_data = response.json()

#             if isinstance(response_data, dict) and 'answer' in response_data:
#                 answer = response_data['answer']
#             else:
#                 answer = "The response format is unexpected or an error occurred."
            
#             return answer

#         else:
#             return f"Error: {response.status_code}, {response.text}"

#     except Exception as e:
#         return f"Cloudflare AI Error: {str(e)}"


st.set_page_config(layout="wide")

st.title('RentRightly')

col1, spacer, col2 = st.columns([5, 3, 5])


with col1:
    st.header("Upload your contract here!")
    uploaded_file = st.file_uploader("Choose a PDF file", type="pdf")
    text_content = ""  # Initialize text_content here

    if uploaded_file is not None:
        with open(uploaded_file.name, "wb") as f:
            f.write(uploaded_file.getbuffer())
        
        st.markdown(f"<h3 style='font-size:16px;'>Preview: {uploaded_file.name}</h3>", unsafe_allow_html=True)
        st.markdown(
            f'<iframe src="data:application/pdf;base64,{base64.b64encode(uploaded_file.getvalue()).decode()}" width="120%" height="800" type="application/pdf"></iframe>',
            unsafe_allow_html=True,
        )

        encoded_content = base64.b64encode(uploaded_file.getvalue()).decode('utf-8')
        access_token = 'ya29.a0AfB_byBP9UcAGr-Y8ItZg_uwghu83fryxYu12nHcijlt7bqTuySCQSaKStvaBLSgasgrMsO4byN-t2o7MLFVlMd-skMU-ap4YEQzSvKP2uxjqEc6AvgxqGrQyEG6r0znNCANNFZr2x_zXZPCoa1_8HUUwExy33IXZiiWaCgYKAdMSARISFQHGX2Mi66-0Oqf82hpsc19iZQvCEw0171'
        text_content = get_document_text(encoded_content, access_token)  # Update text_content here

# with spacer:
#     st.write("")

with col2:

    # Create a button to get the summary and check if the document is uploaded
    if uploaded_file is not None and text_content and not text_content.startswith("Error:"):
        if st.button('Get Contract Summary'):
            summary = get_summary(text_content)
            st.write(summary)
        else:
            st.write("")  


    st.header("Ask Me Anything!")
    # Store the question in a variable
    question = st.text_input("Ask a question based on your housing contract:")


    # Create a button to get the answer and check if a question is entered
    if st.button('Get Answer'):
            answer = get_answer(question, text_content)
            st.write(answer)
    else:
        if not uploaded_file:
            st.error("Please upload a document first.")