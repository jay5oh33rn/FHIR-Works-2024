import requests

# FUNCTIONS TO HANDLE HTTP REQUESTS TO GET FHIR PATIENT DATA FROM FRONT END

url = 'https://auramind.com/'

def get_patient_id():

    response = requests.get(url)

    params = {patient_id: 'patient_id'} 
    response = requests.get(url, params=params)

    if response.status_code == 200:
        # Successful request
        data = response.json()
        # Assuming the response contains patient information including ID
        patient_id = data.get('patient_id')
        print(f"Patient ID: {patient_id}")
        return patient_id
    else:
        # Handle the error
        print(f"Error: {response.status_code} - {response.text}")

def get_patient_summary(patient_id: str):

    response = requests.get(url)

    params = {patient_id: 'patient_id'} 
    response = requests.get(url, params=params)

    if response.status_code == 200:
        # Successful request
        data = response.json()
        # Assuming the response contains patient information including ID
        patient_summary = data.get('patien_summary')
        print(f"Patient Summary: {patient_summary}")
        return patient_summary
    else:
        # Handle the error
        print(f"Error: {response.status_code} - {response.text}")

def get_prompt():

    prompt = requests.get(url)

    params = {prompt: 'prompt'} 
    response = requests.get(url, params=params)

    if response.status_code == 200:
        # Successful request
        data = response.json()
        # Assuming the response contains patient information including ID
        prompt = data.get('prompt')
        print(f"Prompt: {prompt}")
        return prompt
    else:
        # Handle the error
        print(f"Error: {response.status_code} - {response.text}")

# Copyright 2023 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Simple implementation of chat bot using Vertex API.

def chat_stream_example(project_id: str, location: str, patient_summary: str) -> str:
    # [START aiplatform_gemini_multiturn_chat_stream]
    import vertexai
    from vertexai.generative_models import GenerativeModel, ChatSession

    vertexai.init(project=project_id, location=location)
    model = GenerativeModel("gemini-1.0-pro")
    chat = model.start_chat()

    def get_chat_response(chat: ChatSession, prompt: str) -> str:
        text_response = []
        responses = chat.send_message(prompt, stream=True)
        for chunk in responses:
            text_response.append(chunk.text)
        response_text = "".join(text_response)

        # Send the response to the URL
        response = requests.post(url, data={'response': response_text})

        if response.status_code == 200:
            print("Response successfully sent to the server.")
        else:
            print(f"Failed to send the response to the server. Status code: {response.status_code}")

        return response_text

    prompt = "You are a virtual AI therapist chatbot called AuraMind. \
              Please introduce yourself as such. AuraMind will be able to determine self-harm and suicidal tendencies, \
              alerting the patient’s PCN and sending the patient crisis helplines in the meantime."
     
    print(get_chat_response(chat, prompt))

    get_chat_response(chat, patient_summary) # Fine tuning step to tailor the response to specific patient summary

    print("Enter '/' to exit the chat with AuraMind")

    while True:

        # Get prompt from user from front end
        get_prompt()
        print()
        if prompt == '/':
            print("Goodbye!")
            break
        else:
            print(get_chat_response(chat, prompt))
            print()

    # [END aiplatform_gemini_multiturn_chat]
    return

# Project ID is unique in this instance of the cloud server.
patient_id = get_patient_id()
patient_summary = get_patient_summary(patient_id)
chat_stream_example("bamboo-insight-416315", "us-central1", patient_summary)
