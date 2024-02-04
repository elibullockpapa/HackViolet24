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
    access_token = 'ya29.a0AfB_byCeGthCMdY9PS9bg-ugPKQZwy82l-QOX5KBx21v7Kg2YJOKqrXeSIwy-l7qmTGyoEo76dtciYkfX1-FEddjNwGC2HsvwzjX8eruMZhB52CXLF0iBoR95dDaSWHew68yI7VwncESAHdeBKwJP-ofGed_md8MfGhgiaCCqP4aCgYKAQASARISFQHGX2MidNmefXCmw0FkajXriMyAWQ0178'
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
        trimmed_text_content = text_content[:1000]
        messages = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": f"Please summarize the following text for me:\n\n{trimmed_text_content}"}
        ]
        summary_response = client.chat.completions.create(model="gpt-3.5-turbo",  
        messages=messages)
        summary = summary_response.choices[0].message.content
        return summary
    except Exception as e:
        return f"OpenAI Error: {str(e)}"


st.title('RentRightly')

uploaded_file = st.file_uploader("Choose a PDF file", type="pdf")
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
    
    access_token = 'ya29.a0AfB_byCeGthCMdY9PS9bg-ugPKQZwy82l-QOX5KBx21v7Kg2YJOKqrXeSIwy-l7qmTGyoEo76dtciYkfX1-FEddjNwGC2HsvwzjX8eruMZhB52CXLF0iBoR95dDaSWHew68yI7VwncESAHdeBKwJP-ofGed_md8MfGhgiaCCqP4aCgYKAQASARISFQHGX2MidNmefXCmw0FkajXriMyAWQ0178'
    st.markdown("\n\n")
    if st.button('Get Summary'):
        openai_api_key = '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'
        text_content = get_document_text(encoded_content, access_token)
        if not text_content.startswith("Error:"):
            summary = get_summary(text_content)
            st.write(summary)
        else:
            st.error(text_content) 
