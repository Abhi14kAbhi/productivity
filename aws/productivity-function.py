import json
import boto3
import time
import datetime

dynamodbTableName = "productivity-table"
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(dynamodbTableName)

def lambda_handler(event, context):
    
    # {
    #   "start": 1669865400,
    #   "comment": "Some comment",
    #   "status": "UNPRODUCTIVE"
    # }
    
    try:
        # dynamodb object creation
        hourObject = {
            "startTime": event['start'],
            "id": str(event['start']),
            "comment": event['comment'],
            "status": event['status']
        }
        
        table.put_item(Item=hourObject)
        
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
    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            "body": json.dumps({
                'message': 'Something went wrong!!'
            })
        }