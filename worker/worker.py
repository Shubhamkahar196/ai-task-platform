import json
import os
import sys
import time
from bson import ObjectId
from dotenv import load_dotenv
from pymongo import MongoClient
import redis

# Load environment variables
load_dotenv()

# Redis Connection (Connected once outside the loop)
redis_client = redis.Redis.from_url(os.getenv("REDIS_URL"), decode_responses=True)

# MongoDB Connection (Connected once outside the loop)
mongo_client = MongoClient(os.getenv("MONGO_URI"))
db = mongo_client.get_default_database()
tasks_collection = db["tasks"]

# Test Connections once at startup
try:
    redis_client.ping()
    print(" Redis Connected Successfully")
except Exception as e:
    print(" Redis Connection Failed")
    print(e)
    sys.exit(1)

try:
    mongo_client.admin.command("ping")
    print(" MongoDB Connected Successfully")
except Exception as e:
    print(" MongoDB Connection Failed")
    print(e)
    sys.exit(1)

print("\n Worker is running and waiting for tasks...\n")


# Infinite Loop Starts Here
while True:

    # Read task from Redis
    task = redis_client.rpop("taskQueue")
    
    if not task:
        time.sleep(2)  
        continue       

    print("\n--- New Task Received ---")
    print("Task data string:", task)

    try:
        task_data = json.loads(task)
        task_id = task_data["taskId"]
        
        # Find task in MongoDB
        db_task = tasks_collection.find_one({"_id": ObjectId(task_id)})

        if not db_task:
            print(f"Task ID {task_id} not found in MongoDB. Skipping.")
            continue   

        print("Task Document Found:", db_task)

        
        if db_task["status"] == "Success":
            print("Task already completed.")
            continue

        # Update status to Running
        tasks_collection.update_one(
            {"_id": ObjectId(task_id)},
            {
                "$set": {
                    "status": "Running",
                    "logs": "Worker started processing"
                }
            }
        )
        print("Status updated to Running")

        
        operation = db_task.get("operation")
        text = db_task.get("inputText")

        print("Operation:", operation)
        print("Input Text:", text)

        if operation == "uppercase":
            result = text.upper()
        elif operation == "lowercase":
            result = text.lower()
        elif operation == "reverse":
            result = text[::-1]
        elif operation == "wordcount":
            result = str(len(text.split()))
        else:
            raise Exception(f"Invalid operation: {operation}")

        print("Result:", result)


        tasks_collection.update_one(
            {"_id": ObjectId(task_id)},
            {
                "$set": {
                    "status": "Success",
                    "result": result,
                    "logs": "Task completed successfully"
                }
            }
        )
        print("Task Completed Successfully")

    except Exception as e:
        print("Task Failed with error:", e)
        
        if 'task_id' in locals():
            tasks_collection.update_one(
                {"_id": ObjectId(task_id)},
                {
                    "$set": {
                         "status": "Failed",
                          "result": "",
                           "logs": f"Runtime error: {str(e)}"
}
                }
            )
