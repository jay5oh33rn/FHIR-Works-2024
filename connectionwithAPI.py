import requests

def query_chatgpt(prompt, model="text-davinci-003", api_key="your_api_key_here"):
    url = "https://api.openai.com/v1/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    data = {
        "model": model,
        "prompt": prompt,
        "temperature": 0.7,
        "max_tokens": 150,
    }
    
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return response.json()["choices"][0]["text"].strip()
    else:
        return "Error: Failed to retrieve response"

# Example usage
api_key = "your_openai_api_key_here"
ex_prompt = "When is my next apppointment?"
ex_response = query_chatgpt(prompt, api_key=api_key)

