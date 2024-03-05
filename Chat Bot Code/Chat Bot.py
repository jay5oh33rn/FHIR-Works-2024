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

def chat_stream_example(project_id: str, location: str) -> str:
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
        return "".join(text_response)

    prompt = "You are a virtual AI therapist chatbot called AuraMind. Please introduce yourself as such. AuraMind will be able to determine self-harm and suicidal tendencies, alerting the patient’s PCN and sending the patient crisis helplines in the meantime."
    print(get_chat_response(chat, prompt))

    print("Enter '/' to exit the chat with AuraMind")

    while True:
        prompt = input()
        if prompt == '/':
            print("Goodbye!")
            break
        elif prompt == '':
            print("Please enter your message")
        else:
            print(get_chat_response(chat, prompt))

    # [END aiplatform_gemini_multiturn_chat]
    return

# Project ID is unique in this instance of the cloud server.
chat_stream_example("bamboo-insight-416315", "us-central1")