var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// const admin = require("firebase-admin");
// const { v4: uuidv4 } = require('uuid');
// const serviceAccount = require("./fcmmsg-cfe6a-firebase-adminsdk-jfvr5-ce0f2ed666.json");

var app = express();
// const port = 8080;
// const registrationToken = 'eMLKfUFmoYw:APA91bE_H14CfoX6Ty5h0_61M9GPd0G5Z_rTaqGoy7qwBAPybJyrHnuxqcMh0YKuyTxB3cY-W-7xELqERACkEcXExxuENcpakvllDsy2yrEWZ6AdmTPC5fzv1FfOx2mkJYifRc_kEasF';

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   // storageBucket: "fcmmsg-cfe6a.appspot.com"
// });

// const storageRef = admin.storage().bucket('gs://fcmmsg-cfe6a.appspot.com');

// // firebase storage에 업로드하는 함수
// async function uploadFile(path, filename) {

//   // Upload the File
//   const storage = await storageRef.upload(path, {
//     public: true,
//     destination: `${filename}`,
//     metadata: {
//       firebaseStorageDownloadTokens: uuidv4(),
//     }
//   });

//   // console.log(storage[0].metadata.mediaLink);
//   return storage[0].metadata.mediaLink;
// }

// // 업로드 실행
// // (async () => {
// //   const url = await uploadFile('./images/puppy.jpg', "my-image-1.jpg");
// //   console.log(url);
// // })();

// // 푸시 알림 보내기
// var imgname = 'dog.jpg';
// var imgurl = 'https://firebasestorage.googleapis.com/v0/b/fcmmsg-cfe6a.appspot.com/o/' + imgname + '?alt=media';
// let message = {
//   notification: {
//     title: '시범 데이터 발송',
//     body: '클라우드 메시지 전송이 잘 되는지 확인하기 위한, 메시지 입니다.',
//     imageUrl: imgurl
//   },
//   token: registrationToken
// };

// // Send a message to the device corresponding to the provided
// // registration token.
// admin.messaging().send(message)
//   .then((response) => {
//     // Response is a message ID string.
//     console.log('Successfully sent message:', response);
//   })
//   .catch((error) => {
//     console.log('Error sending message:', error);
//   });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
