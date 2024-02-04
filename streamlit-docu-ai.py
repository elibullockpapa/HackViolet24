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
    access_token = 'ya29.a0AfB_byDmLmU8gHT5rSG5kKxuiYPnVzB1brd7paD5MN9IGcSumCtKurYI4BN-GWxOias1Mr7sdycpr_L0d08XnB29Yv40x9L6tlyr6j5I1e-dhGsSWTP89g8YuLpSTQap_G5h9OyZMBIPZYiY7k1jykQICqVU7NKoNYc8NWXu2p8aCgYKAegSARISFQHGX2Mi3QTccITOAQYLQbNvzqp_7w0178'
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
        # Adjust this slicing to reduce the token count
        trimmed_text_content = text_content[:1000]  # Adjust this value as needed
        messages = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": f"Please summarize the following text for me in 5-10 lines:\n\n{trimmed_text_content}"}
        ]
        summary_response = client.chat.completions.create(model="gpt-3.5-turbo", messages=messages)
        summary = summary_response.choices[0].message.content
        return summary
    except Exception as e:
        return f"OpenAI Error: {str(e)}"

def get_answer(question, text_content):
    try:
        # Divide the text into segments
        segments = segment_text(text_content, 800)  # Adjust the segment size as needed

        for segment in segments:
            messages = [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"Answer this question based on the text:\n\n{question}\n\nContext:\n{segment}"}
            ]
            answer_response = client.chat.completions.create(model="gpt-3.5-turbo", messages=messages)
            answer = answer_response.choices[0].message.content

            # Implement some basic logic to check if an answer is found
            if "I don't know" not in answer and answer.strip():
                return answer

        return "I couldn't find an answer in the document."
    except Exception as e:
        return f"OpenAI Error: {str(e)}"

# Function to divide the text into smaller segments
def segment_text(text, max_length):
    segments = []
    while text:
        segment = text[:max_length].strip()
        segments.append(segment)
        text = text[len(segment):].strip()
    return segments



st.title('RentRightly')

uploaded_file = st.file_uploader("Choose a PDF file", type="pdf")
text_content = ""  # Initialize text_content here

if uploaded_file is not None:
    # Preview the PDF
    with open(uploaded_file.name, "wb") as f:
        f.write(uploaded_file.getbuffer())
        
    st.markdown(f"### Preview: {uploaded_file.name}", unsafe_allow_html=True)
    st.markdown(
        f'<iframe src="data:application/pdf;base64,{base64.b64encode(uploaded_file.getvalue()).decode()}" width="450" height="700" type="application/pdf"></iframe>',
        unsafe_allow_html=True,
    )

    encoded_content = base64.b64encode(uploaded_file.getvalue()).decode('utf-8')
    
    access_token = 'ya29.a0AfB_byDmLmU8gHT5rSG5kKxuiYPnVzB1brd7paD5MN9IGcSumCtKurYI4BN-GWxOias1Mr7sdycpr_L0d08XnB29Yv40x9L6tlyr6j5I1e-dhGsSWTP89g8YuLpSTQap_G5h9OyZMBIPZYiY7k1jykQICqVU7NKoNYc8NWXu2p8aCgYKAegSARISFQHGX2Mi3QTccITOAQYLQbNvzqp_7w0178'
    text_content = get_document_text(encoded_content, access_token)  # Update text_content here
    st.markdown("\n\n")
    if st.button('Get Summary'):
        openai_api_key = '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'
        text_content = get_document_text(encoded_content, access_token)
        if not text_content.startswith("Error:"):
            summary = get_summary(text_content)
            st.write(summary)
        else:
            st.error(text_content) 


question = st.text_input("Ask a question based on the document:")
if st.button('Get Answer'):
    if not text_content.startswith("Error:"):
        answer = get_answer(question, text_content)
        st.write(answer)
    else:
        st.error("Please upload a document first.")