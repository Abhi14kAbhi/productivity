import json
import boto3
import time
import datetime
from boto3.dynamodb.conditions import Attr
from decimal import *

dynamodbTableName = "productivity-table"
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(dynamodbTableName)

def replace_decimals(obj):
    if isinstance(obj, list):
        for i in range(len(obj)):
            obj[i] = replace_decimals(obj[i])
        return obj
    elif isinstance(obj, dict):
        for k in obj.keys():
            obj[k] = replace_decimals(obj[k])
        return obj
    elif isinstance(obj, Decimal):
        if obj % 1 == 0:
            return int(obj)
        else:
            return float(obj)
    else:
        return obj

def lambda_handler(event, context):
    
    # try:
        response = table.scan(FilterExpression=Attr('startTime').gte(event['startTime']) & Attr('startTime').lte(event['endTime']))
        print(response)
        response["Items"]=replace_decimals(response["Items"])
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            "body": json.dumps({
                'message': "Success!!",
                'data': response
            })
        }
    # except:
    #     return {
    #         'statusCode': 500,
    #         'headers': {
    #             'Content-Type': 'application/json',
    #             'Access-Control-Allow-Origin': '*'
    #         },
    #         "body": json.dumps({
    #             'message': 'Something went wrong!!'
    #         })
    #     }