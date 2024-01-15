from fastapi import FastAPI
from fastapi.params import Body
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
# bash:
# cd fastapi_server
# uvicorn fastapi_main:fast_app --reload
fast_app = FastAPI()

origins = [
    'http://localhost:3000'
    # "http://192.168.0.13:3000", # url을 등록해도 되고
    # "*" # private 영역에서 사용한다면 *로 모든 접근을 허용할 수 있다.
]

fast_app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, # cookie 포함 여부를 설정한다. 기본은 False
    allow_methods=["*"],    # 허용할 method를 설정할 수 있으며, 기본값은 'GET'이다.
    allow_headers=["*"],	# 허용할 http header 목록을 설정할 수 있으며 Content-Type, Accept, Accept-Language, Content-Language은 항상 허용된다.
)


@fast_app.get("/")
async def root():
    return {"message": "Hello World"}

@fast_app.get("/test_url")
async def root2():
    return {"message": "test_url hello"}

@fast_app.post("/createposts")
def createposts(payload: dict = Body(...)):
    print(payload)
    return {"new_post":f"title: {payload['title']} content: {payload['content']}"}

