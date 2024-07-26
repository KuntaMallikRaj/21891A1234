import requests
import asyncio
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse

app = FastAPI()

window = []
window_size = 10

access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxOTc0ODQzLCJpYXQiOjE3MjE5NzQ1NDMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImYxOTYyNjU2LTY1MjktNGVmMi04NjAyLTM3MzIwM2MwMzZmZiIsInN1YiI6Imt1bnRhbWFsbGlrcmFqQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6ImhleHRyZW5kcyIsImNsaWVudElEIjoiZjE5NjI2NTYtNjUyOS00ZWYyLTg2MDItMzczMjAzYzAzNmZmIiwiY2xpZW50U2VjcmV0IjoiZVRodnR6aUxSSW9McG9FUSIsIm93bmVyTmFtZSI6Ikt1bnRhIE1hbGxpayBSYWoiLCJvd25lckVtYWlsIjoia3VudGFtYWxsaWtyYWpAZ21haWwuY29tIiwicm9sbE5vIjoiMjE4OTFBMTIzNCJ9.nfWIS6FyKaZg3C6w6Llmm9OICvewNjo1-6zKJnqDyZs"

async def fetch_data(url):
    try:
        headers = {"Authorization": f"Bearer {access_token}"}
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
        "average": 0
    })