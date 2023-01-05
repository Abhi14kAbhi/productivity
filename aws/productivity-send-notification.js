import https from 'https';
import AWS from 'aws-sdk';

const dynamo = new AWS.DynamoDB.DocumentClient();

export const handler = async (event, context) => {
  const tokenObject = await dynamo
    .get({
      TableName: 'productivity-fcm-token',
      Key: {
        user: 'yogita',
      },
      Region: 'ap-south-1',
    })
    .promise();

  return new Promise((resolve, reject) => {
    const options = {
      host: 'fcm.googleapis.com',
      path: '/fcm/send',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.firebase_server_key}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, res => {
      resolve('success');
    });

    req.on('error', e => {
      reject(e.message);
    });
    console.log('lalalala', tokenObject['Item']['token']);
    const reqBody = JSON.stringify({
      to: tokenObject['Item']['token'],
      notification: {
        title: 'Hey Yogita',
        body: 'How was your day in Mahabaleshwar?',
        sound: 'kaam_kiya',
        android_channel_id: 'sound_channel',
      },
      data: {
        field1: 'value1',
        field2: 'value2',
      },
      content_available: true,
      priority: 'high',
    });

    req.write(reqBody);
    req.end();
  });
};
