### Key takeaways

#### Routes
* Accepts the request  
* Define authentication and authorization     
* Formats and responds with appropriate http status codes
* Can throw http status code based errors


#### Actions
* Business logic lives here.  
* This layer should operate all of its calls to services and not directly interact with models.  This keeps the data access and creation logic to a single point within a service.  


#### Services
* Makes use of models, other micro services, to persist and read data.  
* Should not throw http errors, generally I dont' like it to throw any errors. If for example I look up a document and its not found I wouldn't throw an exception I would return null and let the action layer decide if thats an acceptable use case or let the controller throw a 404 if it needs to.

#### Models
* They're models you know the deal.
* Should only act upon them selves or inner classes.
* Don't pull in other models into models unless they are true inner class type relationships.


#### Jobs & Workers
* Jobs are single modules
* They contain logic to validate their data.
* They have an enqueue method to leverage the validation and put the job on the queueu.
* They have a work method that performs the actual task.
  

#### Key tools and packages

* No babel - no build needed - fast dev loop
* Bunyan - super great JSON formatted logging.
* Boom - standard well formatted error messages.
* Joi - Object schema validator for req params and job params.
* dotenv - env variables in a single file.  Accessed through process.env within the application.
* RabbitMQ - for messaging and to task workers with a job.


#### Links
* Joi - https://github.com/hapijs/joi
* Boom - https://github.com/hapijs/boom
* RabbitMQ - https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html
* Bunyan - https://github.com/trentm/node-bunyan

#### Seed DB
Drop your db first then run  
node ./app/db/seed.js