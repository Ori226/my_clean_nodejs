# my_clean_nodejs

required npms:

├── async@0.9.0
├── aws-sdk@2.1.24
├── connect-form@0.2.1
├── express@4.12.3
├── multer@0.1.8
└── redis@0.12.1

files:
appexprss.js -  main file. run the server and routing the requests
index.html - the static html front end
my_config.js -  grouping of the different configurations
cache_manager.js - redis wrapper (cache DAL)
ec2_lb_stat.js - helper function for querying ec2 states
MyS3Wrapper.js - an S3 hlper functions