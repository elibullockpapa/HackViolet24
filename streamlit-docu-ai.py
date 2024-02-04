import streamlit as st
import requests
import base64
import json

# Function to process the document and get the summary
def get_document_summary(encoded_content, access_token):
    payload = json.dumps({
        "skipHumanReview": True,
        "rawDocument": {
            "mimeType": "application/pdf",
            "content": encoded_content
        }
    })

    project_id = 'cwaipai'
    access_token = 'ya29.a0AfB_byAcdad1IGwk6iNmdggnk8EKQQVPn2hX8JRQ8IfIG_Kj21SnrMJe5gZsJnEQw-OIUv0VHyKLJtJMllwuflyvUwxwHracRUfJbyUDuI_zQjI-rfGd6dLl8QLpzWVazr6IgmFUf3P8D-yxb8ppPU6n7dx-PtECwqtALmEVjAaCgYKAUgSARISFQHGX2MiuAjaCLZo-8WCnRa07F0wfg0177'
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
    
    access_token = st.secrets["ACCESS_TOKEN"]
    st.markdown("\n\n")
    if st.button('Get Summary'):
        summary = get_document_summary(encoded_content, access_token)
        st.write(summary)
