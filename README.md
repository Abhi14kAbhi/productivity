Productivity

This is a small React Native application that I created for a friend(lets call her "Bali"), to track her hourly productivity.

This application uses React-Native as User interface and AWS services for backend. 
Used AWS Lambda, DynamoDB, API Gateway and Eventbridge.
Also used Firebase Cloud messaging(FCM) for hourly notification.

This application is specifically created for just one user, so there are no login screens, but we can modify it if we want to.

This app is used to track how productive Bali is because she is a lazy person.

Anyways, now onto how this application works:

So, when Bali opens the app for the first time, there will be one API call that will be made to AWS to save the FCM token in the DynamoDB.

Now that we have the FCM token, we can send the notifications every hour to our app.

Just to make things interesting, I added the notification as a very annoying voice, which says "Kam kiya???". LOL...

This was the most interesting part of the project and was something new for me.
Now that I look into it, it was very easy. LOL.

Anyways, now that we are sending hourly notification to Bali, it will remind her to be productive. 
But thats not it, she can also add what she did in the past hour and she can also tell the app if she was productive or not.

Once the app has enough data, the app also has some very bad looking graphs for monthly and weekly basis, so she can track, how much produtive she was during a certain period of time.

I have added some sceenshots below of the app. 



PS: Please dont judge the app based on below screenshots, I know that the design is very bad, but in my defence I ama developer and not a designer. 
Anyways, if you've reached till here, thanks for the read.


![WhatsApp Image 2023-01-05 at 10 43 55 PM](https://user-images.githubusercontent.com/55075185/210841107-f3875785-0190-4a84-b885-5030263c6a83.jpeg)
![WhatsApp Image 2023-01-05 at 10 43 54 PM (2)](https://user-images.githubusercontent.com/55075185/210841112-248b6144-f39c-43a5-a80d-3d12ddbbb242.jpeg)
![WhatsApp Image 2023-01-05 at 10 43 54 PM (1)](https://user-images.githubusercontent.com/55075185/210841118-e5b04754-d268-4fd1-8578-847c0ba9ba13.jpeg)
![WhatsApp Image 2023-01-05 at 10 43 54 PM](https://user-images.githubusercontent.com/55075185/210841130-b7a11428-04da-4fa9-b0c6-356ad75c72ce.jpeg)
![WhatsApp Image 2023-01-05 at 10 43 53 PM](https://user-images.githubusercontent.com/55075185/210841139-0590a2fc-7fc1-407a-9901-35c024b64320.jpeg)



