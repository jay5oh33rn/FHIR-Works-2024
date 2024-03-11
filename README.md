# Aura Mind Project Introduction

Aura Mind is our project to help people with mental health care using the NHS app. It adds a new mental health section to the app. Users can manage appointments, talk directly to healthcare teams, and use an AI chatbot, Aura Mind, for quick advice. The chatbot checks on users and alerts healthcare teams if needed. Our goal is to make getting help easier and faster.

**Team Members:**
- Simran Goel (simran.goel.23@ucl.ac.uk)
- Aiden Li (yiliu.li.23@ucl.ac.uk)
- Guangqian Ma (guangqian.ma.23@ucl.ac.uk)
- Xinyi Wu (xinyi.xinyi.23@ucl.ac.uk)
- Felicia Ong (felicia.hui.23@ucl.ac.uk)
- Joshua Soh (soh.soh.23@ucl.ac.uk)

# Running Aura Mind

> **Note**: The code currently uses a placeholder server address `192.168.0.1`. Before executing these codes, ensure to update this address to your actual server location.

## Prerequisites
- Docker Engine 25.0 installed on the machine.
- Python 3.12 environment set up.
- Java 21 installed on the machine
- Google Cloud account.
- Node.js 20.11.1 and npm (included) installed for React application deployment.

## Steps

### 1. Set Up the FHIR Server
1. Run the command: `docker-compose -f fhir-server/docker-compose.yml up -d`

This command starts the FHIR server and database.

### 2. Import Mock FHIR Data
1. Access the FHIR server at `Your_Server_Location`.
2. From the `fhir-server` directory, import `Observation.json`, `Patient.json`, and `Procedure.json` into the server to populate it with sample data.

### 3. Set Up the Chatbot
1. Create a Google Cloud Account at [Google Cloud](https://cloud.google.com) and activate the account with payment details to access Vertex AI services.
2. Enable the Vertex AI API and install the Vertex AI SDK for Python following the [quickstart guide](https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart-multimodal).
3. Configure the environment with the Google Cloud project ID:
 - Generate a unique Project ID using the Cloud Shell Editor.
 - Set the project ID in `chatbot.py`:
   ```python
   chat_stream_example("PROJECT_ID", "us-central1")
   ```
- Execute `chatbot.py` to start interacting with the AI-driven chatbot: `python gemini-api/chatbot.py`

### 4. Deploy Java Authentication Code
To deploy the Java authentication code (`Login.java`) that interacts with the chatbot and FHIR server:
1. Compile the Java code: `javac Backend/Login.java`
2. Run the compiled Java application, replacing `myUsername` and `myPassword` with actual credentials: `java -cp Backend Login myUsername myPassword`

### 5. Deploy React User Interface
1. Navigate to the React project directory.
2. Install Dependencies: Run `npm install` to install the required packages.
3. Build the Project: Execute `npm run build` to create a production build of the React app.
4. Deployment:
  - For local testing, serve the build folder using a static server. If not already installed, install `serve` via npm:
    ```
    npm install -g serve
    serve -s build
    ```
    This serves the app on a local server.
  - For production deployment, use a platform like Netlify, Vercel, or GitHub Pages. Follow the platform-specific instructions to deploy the `build` folder. This often involves pushing the code to a GitHub repository and connecting the repository to the deployment platform.

Ensure Docker is running, and the Python, Java and Node.js environments are properly set up before executing these steps.
