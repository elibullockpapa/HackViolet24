# RentRightly Project

RentRightly is a platform designed to demystify housing contracts for tenants and landlords, ensuring clarity and mutual understanding for all parties involved.

# Inspiration
As college students, we have experienced how housing contracts can be very long, and it can take a long time to find the answer to a question like "will I be able to bring my pet?". That's why we created RentRightly - an interface for getting clarification about lease and rental agreements.

# What it does
For student renters - we use AI to help you summarize and chat with your contracts. Our Q&A interface can give you answers to specific questions about your contract For landlords - use AI to find blind spots in your contracts that require clarification and to keep track of who has viewed or signed them.

# How we built it
We use Google Cloud vertex AI to convert our PDF documents into OCR text. Then, we use the Cloudflare AI worker agents and OpenAI GPT-4 to summarize the document and let you ask questions about it. We used streamlit as it provides an easy user interface to host and build AI tools.

# Challenges we ran into
Getting cloudflare AI worker agents to run was tough because they depend on open-source models For the OpenAI we initially struggled with context window length since our documents are lengthy. we ultimately shifted to using the latest GPT-4 models.

# Accomplishments that we're proud of
We were able to build all of this in less than 24 hours of ideation and our prototype actually works!

# What we learned
We learned about how to build and deploy streamlit apps, how to use Google Cloud APIs, and also the Cloudflare AI worker agents. We also, unfortunately, learned that getting a react web app interface for everything was too much to get fully functional in just 24 hours with our limited experience, so we resorted to Streamlit.

# What's next for RentRightly
We can build out our web app's functionality to bring it inline with our Streamlit application.

## License

This project is open source and available under the [MIT License](LICENSE).
