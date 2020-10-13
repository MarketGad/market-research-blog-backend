# REST API End-points  List
## User
<pre>
api/user/signupuser
api/user/sendotp
api/user/verifyotp
api/user/loginuser
api/user/resetpassword
api/user/googlelogin [POST]
api/user/ [ GET ]
api/user/profile [ GET, PUT ]
</pre>

## Product Details
<pre>
api/productdetails/ [GET, POST]
api/productdetails/:productID [PUT, GET]
api/productdetails/:productID/comments [GET, POST]
api/productdetails/:productID/comments/:commentID [GET, PUT]
api/productdetails/:productID/upvotes/add [POST]
api/hotproducts [GET]
api/hotproducts/recent [GET]
</pre>

## Job Profiles
<pre>
api/jobprofiles
api/jobprofiles/:jobId
api/jobprofiles/hire/:jobId 
api/jobprofiles/:jobId/addrating
api/jobs [POST]
api/jobs/:jobType [GET]
</pre>

## Payment
<pre>
api/payment/razorpay/:jobId
api/payment/verification
</pre>

## Disrupter's Club
<pre>
/api/disrupterclub/posts [GET ,POST]
/api/disrupterclub/posts/:postId/comments [GET, POST]
/api/disrupterclub/posts/:postId/upvote [POST ]
</pre>