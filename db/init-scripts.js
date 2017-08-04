show dbs

use test

db.dropDatabase()

show dbs

use test

db.users.insert([
	{  
		"_id":ObjectId("5976bc16359e8e33889aa041"),
		"_class":"org.xpanxion.radix.radixserver.dao.model.MongoUser",
		"credentials":{  
			"username":"a@a.com",
			"password":"password"
		},
		"grantedAuthorities":[  
			{  
				"role":"ROLE_ADMIN",
				"_class":"org.springframework.security.core.authority.SimpleGrantedAuthority"
			}
		],
		"personalData":{  
			"firstName":"Arthur",
			"lastName":"Admin"
		}
	}, {  
		"_id":ObjectId("5976bc16359e8e33889aa042"),
		"_class":"org.xpanxion.radix.radixserver.dao.model.MongoUser",
		"credentials":{  
			"username":"b@b.com",
			"password":"password"
		},
		"grantedAuthorities":[  
			{  
				"role":"ROLE_USER",
				"_class":"org.springframework.security.core.authority.SimpleGrantedAuthority"
			}
		],
		"personalData":{  
			"firstName":"Common",
			"lastName":"User"
		}
	}
]);

db.user_applications.insert([
	{  
		"_id":ObjectId("5976bc16359e8e33889aa043"),
		"_class":"org.xpanxion.radix.radixserver.dao.model.MongoUserApplications",
		"userId":"5976bc16359e8e33889aa041",
		"applications":[  
			{  
				"_id":null,
				"title":"Sample App 0",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 1",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 2",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 3",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 4",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 5",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 6",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 7",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 8",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 9",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			}
		]
	}, {  
		"_id":ObjectId("5976bc16359e8e33889aa044"),
		"_class":"org.xpanxion.radix.radixserver.dao.model.MongoUserApplications",
		"userId":"5976bc16359e8e33889aa042",
		"applications":[  
			{  
				"_id":null,
				"title":"Sample App 10",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 11",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 12",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 13",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 14",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 15",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 16",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 17",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 18",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 19",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 20",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 21",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 22",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 23",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 24",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 25",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 26",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 27",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 28",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			},
			{  
				"_id":null,
				"title":"Sample App 29",
				"description":"Some sample description.",
				"url":"http://localhost:9001/",
				"isWeb":true
			}
		]
	}
]);