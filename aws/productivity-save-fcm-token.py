import json
import boto3
import time
import datetime

dynamodbTableName = "productivity-fcm-token"
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(dynamodbTableName)

def lambda_handler(event, context):
    print("hihihi", event)
    
    # {
    #     "token": "some_value123"
    # }
    
    try:
        fcmTokenObject = {
            "user": "yogita",
            "token": event['token']
        }
    
        table.put_item(Item=fcmTokenObject)
    
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            "body": json.dumps({
                'message': 'Successfully added!!'
            })
        }  
    except:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            "body": json.dumps({
                'message': 'Something went wrong!!',
            })
        }
    
