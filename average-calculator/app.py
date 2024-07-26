import requests
import asyncio
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv

app = FastAPI()

load_dotenv()

window = []
window_size = 10

async def fetch_data(url):
    try:
        headers = {"Authorization": f"Bearer {os.environ.get("ACCESS_TOKEN")}"}
        async with asyncio.timeout(0.5):
            response = await asyncio.to_thread(requests.get, url, headers=headers)
            response.raise_for_status()
            return response.json()
    except (requests.exceptions.RequestException, asyncio.TimeoutError) as e:
        print(f"Request to {url} timed out or encountered an error: {e}")
        return None

@app.get("/numbers/{number_id}")
async def get_numbers(number_id: str):
    api_endpoint = {
        "e": "http://20.244.56.144/test/even",
        "r": "http://20.244.56.144/test/rand",
        "p": "http://20.244.56.144/test/primes",
        "f": "http://20.244.56.144/test/fibo",
    }

    url = api_endpoint.get(number_id.lower())

    if not url:
        raise HTTPException(status_code=400, detail="Invalid number_id")

    data = await fetch_data(url)

    if data is not None:
        values = data['numbers']
        global window, window_size
        initial_window = window[:]

        window.extend(values)
        window = window[-window_size:]
        average = sum(window) / len(window) if window else 0

        return JSONResponse({
            "initial_window": initial_window,
            "current_window": window,
            "average": average
        })

    average = sum(window) / len(window) if window else 0
    return JSONResponse({
        "initial_window": window,
        "current_window": window,
        "average": average 
    })