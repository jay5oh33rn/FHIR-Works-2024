# Running Aura Mind

## Prerequisites
- Docker installed on your machine.
- Python environment set up.
- A Google Cloud account.

## Steps

### 1. Set Up the FHIR Server
1. **Navigate** to the directory containing `docker-compose.yml`.
2. **Run** the command: `docker-compose up -d`

This starts the FHIR server and database.

### 2. Import Mock FHIR Data
1. **Access** the FHIR server at `http://localhost:8090`.
2. **Import** `Observation.json`, `Patient.json`, and `Procedure.json` to populate the server with sample data.

### 3. Set Up the Chatbot
1. **Create a Google Cloud Account** at [Google Cloud](https://cloud.google.com) and activate your account with payment details to access Vertex AI services.
2. **Enable Vertex AI API** and **install the Vertex AI SDK for Python** following the [quickstart guide](https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart-multimodal).
3. **Configure** your environment with the Google Cloud project ID:
- Generate a unique Project ID using the Cloud Shell Editor.
- Set the project ID in `chatbot.py`:
  ```python
  chat_stream_example(YOUR_PROJECT_ID, "us-central1")
  ```

### 4. Run AuraMind
- Execute `chatbot.py` to start interacting with the AI-driven chatbot: `python chatbot.py`

Ensure Docker is running and your Python environment is properly set up before executing these steps.
