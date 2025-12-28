import { Router } from "express";


// exams version 1 apies

const route = Router();


// ----- define your routes here ----

route.get('/', (req, res) => res.send('Api verson 1 is running'));   

{/** useer route */} 





{/** course route */} 







export default route;



// when we will improve the exams api then we can use this

// exams version 2 apies

// const examsRouter2 = Router();

// ----- define your routes here ----

//  router.get('/', (req, res) => res.send('Parent route'));




// export {examsRouter2} ;